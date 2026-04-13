const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { email, result, answers } = JSON.parse(event.body || '{}');

    if (!email || !result) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing email or result' }),
      };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const notify = process.env.LEAD_NOTIFY_EMAIL || from;

    if (!apiKey || !from) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Email service not configured' }),
      };
    }

    const resend = new Resend(apiKey);
    const metrics = result.metrics || {};
    const hints = result.hints || [];
    const nextSteps = result.nextSteps || [];

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.7; color: #162033; max-width: 680px; margin: 0 auto;">
        <h1 style="font-size: 28px; margin-bottom: 8px;">你的 GTV Readiness Check 结果</h1>
        <p style="color: #55627d; margin-top: 0;">这是一份用于 UK Global Talent Visa (Arts & Culture) 的初步准备度结果，不构成正式法律意见。</p>
        <div style="background: #f5f8ff; border: 1px solid #dce7fb; border-radius: 16px; padding: 20px; margin: 24px 0;">
          <div style="font-size: 14px; color: #5a6782;">当前准备度评分</div>
          <div style="font-size: 48px; font-weight: 800; line-height: 1; margin: 8px 0 12px;">${result.total}</div>
          <div style="font-size: 18px; font-weight: 600;">${result.summary || ''}</div>
        </div>
        <h2 style="font-size: 20px; margin-top: 28px;">三个维度评分</h2>
        <ul>
          <li>证明材料强度：${metrics['证明材料强度'] ?? '-'}</li>
          <li>推荐信网络：${metrics['推荐信网络'] ?? '-'}</li>
          <li>整体准备状态：${metrics['整体准备状态'] ?? '-'}</li>
        </ul>
        <h2 style="font-size: 20px; margin-top: 28px;">当前最需要注意的点</h2>
        <ul>
          ${hints.length ? hints.map((item) => `<li>${item}</li>`).join('') : '<li>你当前没有触发明显的结构性红旗，下一步重点是把现有基础组织得更清楚。</li>'}
        </ul>
        <h2 style="font-size: 20px; margin-top: 28px;">你现在更应该做什么</h2>
        <ul>
          ${nextSteps.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

    await resend.emails.send({
      from,
      to: email,
      subject: '你的 GTV Readiness Check 结果',
      html,
      replyTo: notify,
    });

    await resend.emails.send({
      from,
      to: notify,
      subject: `New GTV lead: ${email}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; line-height: 1.7; color: #162033;">
          <h2>New GTV lead</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Total score:</strong> ${result.total}</p>
          <p><strong>Band:</strong> ${result.band || ''}</p>
          <p><strong>Summary:</strong> ${result.summary || ''}</p>
          <p><strong>Hints:</strong> ${(hints || []).join(' | ')}</p>
          <p><strong>Next steps:</strong> ${(nextSteps || []).join(' | ')}</p>
          <pre style="white-space: pre-wrap; background: #f6f8fb; padding: 12px; border-radius: 8px;">${JSON.stringify({ answers, result }, null, 2)}</pre>
        </div>
      `,
      replyTo: email,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message || 'Send failed' }),
    };
  }
};

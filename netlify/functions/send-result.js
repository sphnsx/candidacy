const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function persistLead({ email, lang, result, answers }) {
  if (!supabase) return;
  const routes = Array.isArray(answers && answers.fields) ? answers.fields : null;
  const { error } = await supabase.from('leads').insert({
    email,
    lang: lang || null,
    score: typeof result.total === 'number' ? result.total : null,
    band: result.band || null,
    routes,
    answers: answers || null,
    result: result || null,
  });
  if (error) {
    console.error('supabase insert failed', error.message);
  }
}

const COPY = {
  zh: {
    subjectUser: '你的 Candidacy 体检 结果 — Candidacy',
    subjectLead: (email) => `新的 Candidacy 体检 完成：${email}`,
    h1: '你的 Candidacy 体检 结果',
    intro: 'Candidacy 是一套面向英国 Global Talent Visa ACE 路径申请人的申请准备评估系统。Candidacy 体检 是免费的诊断层——它告诉你「现状是什么」，不告诉你「该怎么做」。',
    scoreLabel: '当前准备度评分',
    dimensionsHeading: '三个维度',
    hintsHeading: '诊断中显现的风险点',
    hintsEmpty: '当前没有明显的结构性红旗。诊断结果停留在打磨层面，而非重建层面。',
    pointersHeading: '诊断指向的方向',
    pointersIntro: '以下是 Candidacy 体检 在你这个 band 上的方向性提示。它们不构成针对你具体案例的策略建议——具体机会筛选、证据优先级与时间线属于完整 Candidacy 的范围。',
    bridgeHeading: '下一步：完整 Candidacy 评估',
    bridge: 'Candidacy 体检 告诉你「现状是什么」。完整 Candidacy 告诉你「该做什么、按什么顺序、为什么」——包括按当前 ACE 标准筛过的机会 shortlist、证据策略，以及 30/60/90 天行动计划。完整产品上线后，我们会通过此邮箱通知你。',
    disclaimerHeading: '关于这份评估',
    disclaimer: 'Candidacy 不提供受 OISC 监管的移民法律建议，不担任移民代理，不撰写或提交签证申请，不预测 endorsement 结果，也不与 vanity evidence 服务（付费展览画廊、付费发表期刊等）合作。本份 Candidacy 体检 是基于你提交的结构化 intake 自动生成的诊断，不构成针对你个案的法律或策略建议。',
    privacyNote: '我们只发送一次，邮箱只用于本次报告。我们不会把你加入邮件列表。',
    metricLabels: {
      evidence: '证据强度',
      recommenders: '推荐信网络',
      readiness: '整体准备状态',
    },
    lead: {
      h2: '新的 Candidacy 体检 完成',
      labels: {
        email: '邮箱',
        lang: '语言',
        total: '总分',
        band: 'Band',
        summary: '诊断概述',
        hints: '风险标记',
        pointers: '方向性提示',
      },
    },
  },
  en: {
    subjectUser: 'Your Candidacy Scan results — Candidacy',
    subjectLead: (email) => `New Candidacy Scan completion: ${email}`,
    h1: 'Your Candidacy Scan results',
    intro: 'Candidacy is a readiness assessment for UK Global Talent Visa applicants on the ACE pathway. The Candidacy Scan is the free diagnostic layer — it tells you what is, not what to do.',
    scoreLabel: 'Current readiness score',
    dimensionsHeading: 'Three dimensions',
    hintsHeading: 'Where the diagnostic flagged risk',
    hintsEmpty: 'No structural red flags surfaced. The diagnostic findings sit at the level of refinement, not reconstruction.',
    pointersHeading: 'Where the diagnostic points',
    pointersIntro: 'These are directional pointers for your band — not case-specific strategy. Specific opportunity selection, evidence prioritisation, and sequenced timelines sit inside the full Candidacy assessment.',
    bridgeHeading: 'Next: the full Candidacy assessment',
    bridge: 'The Candidacy Scan tells you what is. The full Candidacy tells you what to do, in what order, and why — including a prioritised opportunity shortlist judged against current ACE standards, an evidence strategy, and a 30/60/90-day action plan. We will notify you at this email when the full product is available.',
    disclaimerHeading: 'About this assessment',
    disclaimer: 'Candidacy does not provide OISC-regulated immigration advice, does not act as an immigration agent, does not draft or submit visa applications, does not predict endorsement outcomes, and does not cooperate with vanity-evidence services (pay-to-exhibit galleries, pay-to-publish journals). This Candidacy Scan is an automated diagnostic generated from your structured intake; it is not legal or strategic advice on your individual case.',
    privacyNote: 'We sent this once and used your address only for this report. We don’t add you to a mailing list.',
    metricLabels: {
      evidence: 'Evidence strength',
      recommenders: 'Recommender network',
      readiness: 'Overall readiness',
    },
    lead: {
      h2: 'New Candidacy Scan completion',
      labels: {
        email: 'Email',
        lang: 'Language',
        total: 'Total score',
        band: 'Band',
        summary: 'Summary',
        hints: 'Risk flags',
        pointers: 'Pointers',
      },
    },
  },
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
    const { email, result, answers, lang } = JSON.parse(event.body || '{}');

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
    const copy = COPY[lang === 'en' ? 'en' : 'zh'];
    const metrics = result.metrics || {};
    const hints = Array.isArray(result.hints) ? result.hints : [];
    const nextSteps = Array.isArray(result.nextSteps) ? result.nextSteps : [];

    const metricRows = Object.entries(metrics)
      .map(([key, value]) => {
        const label = copy.metricLabels[key] || key;
        return `<li>${escapeHtml(label)}: ${escapeHtml(value ?? '-')}</li>`;
      })
      .join('');

    const hintsList = hints.length
      ? hints.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
      : `<li>${escapeHtml(copy.hintsEmpty)}</li>`;

    const pointersBlock = nextSteps.length
      ? `
        <h2 style="font-size: 18px; margin-top: 28px;">${escapeHtml(copy.pointersHeading)}</h2>
        <p style="color: #55627d; margin: 0 0 8px;">${escapeHtml(copy.pointersIntro)}</p>
        <ul>${nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      `
      : '';

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.7; color: #162033; max-width: 680px; margin: 0 auto;">
        <h1 style="font-size: 28px; margin-bottom: 8px;">${escapeHtml(copy.h1)}</h1>
        <p style="color: #55627d; margin-top: 0;">${escapeHtml(copy.intro)}</p>
        <div style="background: #f5f8ff; border: 1px solid #dce7fb; border-radius: 16px; padding: 20px; margin: 24px 0;">
          <div style="font-size: 14px; color: #5a6782;">${escapeHtml(copy.scoreLabel)}</div>
          <div style="font-size: 48px; font-weight: 800; line-height: 1; margin: 8px 0 12px;">${escapeHtml(result.total)}</div>
          <div style="font-size: 18px; font-weight: 600;">${escapeHtml(result.summary || '')}</div>
        </div>
        <h2 style="font-size: 18px; margin-top: 28px;">${escapeHtml(copy.dimensionsHeading)}</h2>
        <ul>${metricRows}</ul>
        <h2 style="font-size: 18px; margin-top: 28px;">${escapeHtml(copy.hintsHeading)}</h2>
        <ul>${hintsList}</ul>
        ${pointersBlock}
        <div style="background: #fafbff; border: 1px solid #e6ecf8; border-radius: 12px; padding: 16px; margin: 28px 0;">
          <h2 style="font-size: 16px; margin: 0 0 8px;">${escapeHtml(copy.bridgeHeading)}</h2>
          <p style="margin: 0; color: #2a3550;">${escapeHtml(copy.bridge)}</p>
        </div>
        <h3 style="font-size: 14px; margin-top: 28px; color: #5a6782;">${escapeHtml(copy.disclaimerHeading)}</h3>
        <p style="font-size: 13px; color: #5a6782; margin-top: 4px;">${escapeHtml(copy.disclaimer)}</p>
        <p style="font-size: 12px; color: #8a92a8; margin-top: 16px; border-top: 1px solid #eef1f8; padding-top: 12px;">${escapeHtml(copy.privacyNote)}</p>
      </div>
    `;

    await persistLead({ email, lang, result, answers });

    await resend.emails.send({
      from,
      to: email,
      subject: copy.subjectUser,
      html,
      replyTo: notify,
    });

    await resend.emails.send({
      from,
      to: notify,
      subject: copy.subjectLead(email),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; line-height: 1.7; color: #162033;">
          <h2>${escapeHtml(copy.lead.h2)}</h2>
          <p><strong>${escapeHtml(copy.lead.labels.email)}:</strong> ${escapeHtml(email)}</p>
          <p><strong>${escapeHtml(copy.lead.labels.lang)}:</strong> ${escapeHtml(lang || 'zh')}</p>
          <p><strong>${escapeHtml(copy.lead.labels.total)}:</strong> ${escapeHtml(result.total)}</p>
          <p><strong>${escapeHtml(copy.lead.labels.band)}:</strong> ${escapeHtml(result.band || '')}</p>
          <p><strong>${escapeHtml(copy.lead.labels.summary)}:</strong> ${escapeHtml(result.summary || '')}</p>
          <p><strong>${escapeHtml(copy.lead.labels.hints)}:</strong> ${escapeHtml(hints.join(' | '))}</p>
          <p><strong>${escapeHtml(copy.lead.labels.pointers)}:</strong> ${escapeHtml(nextSteps.join(' | '))}</p>
          <pre style="white-space: pre-wrap; background: #f6f8fb; padding: 12px; border-radius: 8px;">${escapeHtml(JSON.stringify({ answers, result }, null, 2))}</pre>
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

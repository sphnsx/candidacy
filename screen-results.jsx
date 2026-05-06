/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, useNav, useT, useLang, useAnswers, calculateResult */

function ResultsScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();
  const { lang } = useLang();
  const { answers, reset } = useAnswers();

  const result = React.useMemo(() => calculateResult(answers, lang), [answers, lang]);
  const score = result.total;
  const primary = result.primary;

  // Email gate state
  const [email, setEmail] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [sendError, setSendError] = React.useState('');

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function sendReport(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!validEmail || sending) return;
    setSending(true); setSendError('');
    try {
      // Build a payload compatible with netlify/functions/send-result.js
      const payload = {
        email,
        lang,
        result: {
          total: result.total,
          band: primary.band,
          summary: primary.summary,
          metrics: {
            evidence: result.metrics.evidence,
            recommenders: result.metrics.recommenders,
            readiness: result.metrics.readiness,
          },
          hints: result.hints || [],
          nextSteps: result.nextSteps || [],
        },
        answers,
      };
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      let res;
      try {
        res = await fetch('/api/send-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSent(true);
    } catch (err) {
      if (err && err.name === 'AbortError') {
        setSendError(t('Send timed out. Check your connection and try again.', '发送超时，请检查网络后重试。'));
      } else {
        setSendError(t('Send failed. Please try again.', '发送失败，请稍后再试。'));
      }
    } finally {
      setSending(false);
    }
  }

  // Mind-map results: hub = score, 3 branches = axes, hints as leaves
  const hubX = 220, hubY = 260;
  const axes = [
    { x: 520, y: 110, color: A.yellow, label: t('Evidence', '证据'),       score: `${result.metrics.evidence} / 40` },
    { x: 520, y: 260, color: A.mint,   label: t('Recommenders', '推荐人'),  score: `${result.metrics.recommenders} / 30` },
    { x: 520, y: 410, color: A.violet, label: t('Readiness', '准备状态'),   score: `${result.metrics.readiness} / 30` },
  ];

  // Axis imbalance — surface when the gap between strongest and weakest axis
  // is meaningful (≥ 15 percentage points), so users see why the score lands
  // where it does instead of treating the number as a black box.
  // Three shapes: one weak outlier (others stronger than it), one strong
  // outlier (it stronger than the others), or a spread (top vs bottom).
  const axisPcts = [
    { key: 'evidence',     pct: (result.metrics.evidence     || 0) / 40, label: t('evidence base',       '证据基础') },
    { key: 'recommenders', pct: (result.metrics.recommenders || 0) / 30, label: t('recommender network', '推荐人网络') },
    { key: 'readiness',    pct: (result.metrics.readiness    || 0) / 30, label: t('readiness & narrative', '准备状态与叙述') },
  ];
  const sortedAxes = [...axisPcts].sort((a, b) => a.pct - b.pct);
  const [weakAxis, midAxis, strongAxis] = sortedAxes;
  const overallGap = strongAxis.pct - weakAxis.pct;
  const wmGap = midAxis.pct - weakAxis.pct;
  const msGap = strongAxis.pct - midAxis.pct;

  let imbalanceNote = null;
  if (overallGap >= 0.15) {
    if (wmGap >= msGap + 0.15) {
      // Weakest axis is the clear outlier — name the other two as a cluster.
      imbalanceNote = t(
        `${midAxis.label} and ${strongAxis.label} read notably stronger than ${weakAxis.label} — the overall score reflects that gap, not just one weakest area.`,
        `${midAxis.label}和${strongAxis.label}明显强于${weakAxis.label}——总分反映的是这种不平衡，而不是单一最弱项。`
      );
    } else if (msGap >= wmGap + 0.15) {
      // Strongest axis is the clear outlier — name the other two as a cluster.
      imbalanceNote = t(
        `${strongAxis.label} reads notably stronger than ${weakAxis.label} and ${midAxis.label} — the overall score reflects that gap, not a single strong area.`,
        `${strongAxis.label}明显强于${weakAxis.label}和${midAxis.label}——总分反映的是这种不平衡，而不是只看单一最强项。`
      );
    } else {
      // Even spread — fall back to a two-axis comparison between the extremes.
      imbalanceNote = t(
        `Stronger on ${strongAxis.label} than on ${weakAxis.label} — the overall score reflects that gap.`,
        `${strongAxis.label}方面比${weakAxis.label}方面更稳——总分反映的是这种不平衡。`
      );
    }
  }

  const hintLeaves = (result.hints && result.hints.length ? result.hints : [
    t('No structural red flags — focus on tightening what you already have.', '当前没有结构性红旗——重点是把已有的部分整理得更清楚。')
  ]).slice(0, 6).map((h, i) => ({
    from: i % 3,
    x: 880,
    y: 60 + i * 80,
    color: i % 2 === 0 ? A.pink : A.yellow,
    label: h,
  }));

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="check" />

      <div style={{ padding: '56px 56px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Bullet color={theme.brand} size={10} />
          <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.03em', textTransform: 'uppercase', color: theme.inkMuted }}>
            {t('Readiness map · complete', '准备度地图 · 已完成')}
          </span>
        </div>
        <h1 style={{
          fontFamily: theme.serif, fontWeight: 400, fontSize: 52, letterSpacing: '-0.022em',
          margin: '0 0 14px', lineHeight: 1.05, maxWidth: 980, textWrap: 'balance', color: theme.ink,
        }}>
          {primary.summary}
        </h1>
        {imbalanceNote && (
          <p style={{ color: theme.ink, fontSize: 16.5, maxWidth: 760, margin: '0 0 10px', lineHeight: 1.55, fontWeight: 500 }}>
            {imbalanceNote}
          </p>
        )}
        <p style={{ color: theme.inkMuted, fontSize: 16, maxWidth: 720, margin: 0, lineHeight: 1.55 }}>
          {t(
            `Primary route: ${primary.label}. A structured information analysis, not legal advice.`,
            `主路径：${primary.label}。这是一份结构化的信息分析，不是法律意见。`
          )}
        </p>
      </div>

      {/* Mind-map results visual */}
      <div style={{ padding: '20px 56px 40px', borderBottom: `1px solid ${theme.hairlineFaint}` }}>
        <MindMap width={1168} height={560} theme={theme}>
          <svg width={1168} height={560} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {axes.map((a, i) => (
              <MMLine key={'a'+i} x1={hubX + 28} y1={hubY} x2={a.x - 8} y2={a.y} color={theme.connector} />
            ))}
            {hintLeaves.map((l, i) => (
              <MMLine key={'l'+i} x1={axes[l.from].x + 140} y1={axes[l.from].y} x2={l.x - 8} y2={l.y} color={theme.connector} dashed />
            ))}
          </svg>

          {/* Hub: score */}
          <div style={{
            position: 'absolute', left: hubX, top: hubY,
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 180, height: 180, borderRadius: '50%',
              background: theme.bg,
              border: `2px solid ${theme.brand}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 10px ${theme.brand}14`,
            }}>
              <div style={{ fontFamily: theme.serif, fontSize: 88, fontWeight: 400, color: theme.ink, letterSpacing: '-0.03em', lineHeight: 1 }}>{score}</div>
              <div style={{ fontFamily: 'Geist', fontSize: 12, color: theme.inkMuted, marginTop: 4 }}>
                / 100 · {result.band === 'low' ? t('initial', '初步') : result.band === 'mid' ? t('mid', '中段') : t('strong', '靠前')}
              </div>
            </div>
          </div>

          {axes.map((a, i) => (
            <div key={i} style={{
              position: 'absolute', left: a.x, top: a.y,
              transform: 'translateY(-50%)',
              display: 'flex', alignItems: 'center', gap: 12,
              background: theme.bg, padding: '8px 14px',
              border: `1px solid ${theme.hairlineFaint}`, borderRadius: 999,
            }}>
              <Bullet color={a.color} size={12} />
              <span style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 600, color: theme.ink, letterSpacing: '-0.01em' }}>{a.label}</span>
              <span style={{ fontFamily: 'Geist', fontSize: 13, color: theme.inkMuted }}>{a.score}</span>
            </div>
          ))}

          {hintLeaves.map((l, i) => (
            <MMNode key={i} theme={theme} x={l.x} y={l.y} anchor="start" color={l.color} size={11}
              wrap maxWidth={260} label={l.label} />
          ))}
        </MindMap>
      </div>

      {/* Next moves + email gate */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr' }}>
        <div style={{ padding: '52px 56px', borderRight: `1px solid ${theme.hairlineFaint}` }}>
          <ColorHeader color={theme.ink} size={32}>{t('Next moves, in order', '下一步，按顺序')}</ColorHeader>
          <p style={{ color: theme.inkMuted, fontSize: 14.5, margin: '10px 0 30px' }}>
            {t(`Scoped to your primary route — ${primary.label}.`, `范围限定在你的主路径——${primary.label}。`)}
          </p>
          <div style={{ display: 'grid', gap: 22 }}>
            {(result.nextSteps || []).map((step, i) => {
              const colors = [A.yellow, A.mint, A.violet, A.tan];
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 16 }}>
                  <Bullet color={colors[i % colors.length]} size={14} style={{ marginTop: 6 }} />
                  <div>
                    <div style={{ fontFamily: 'Geist', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: theme.inkMuted, marginBottom: 4 }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: 15, color: theme.ink, lineHeight: 1.55 }}>{step}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '52px 56px', background: theme.surface }}>
          {/* Alternate routes */}
          {result.alternates.length > 0 && (
            <>
              <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 14 }}>
                {t('Alternate routes', '其他路径')}
              </div>
              <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
                {result.alternates.slice(0, 3).map((r, i) => {
                  const colors = [A.teal, A.lilac, A.tan];
                  return (
                    <div key={r.field} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '14px 0', borderBottom: `1px solid ${theme.hairlineFaint}`,
                    }}>
                      <Bullet color={colors[i % colors.length]} size={12} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Geist', fontSize: 15.5, fontWeight: 600, color: theme.ink, letterSpacing: '-0.01em' }}>{r.label}</div>
                        <div style={{ fontSize: 13, color: theme.inkMuted }}>{r.summary}</div>
                      </div>
                      <span style={{ fontFamily: 'Geist', fontSize: 22, fontWeight: 600, color: theme.ink, letterSpacing: '-0.02em' }}>{r.total}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Email gate */}
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 14 }}>
            {t('Email me this report', '把报告发给我')}
          </div>
          {sent ? (
            <div style={{
              padding: '14px 16px', borderRadius: 12,
              border: `1px solid ${theme.hairlineFaint}`,
              background: theme.bg,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Bullet color={A.mint} size={11} />
              <span style={{ fontSize: 14, color: theme.ink }}>
                {t(`Sent to ${email}. Check your inbox.`, `已发送至 ${email}，请查收邮箱。`)}
              </span>
            </div>
          ) : (
            <form onSubmit={sendReport}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('your@email.com', '你的邮箱')}
                  required
                  style={{
                    flex: 1, padding: '12px 14px', fontSize: 14,
                    fontFamily: 'Geist, sans-serif',
                    border: `1px solid ${theme.hairlineFaint}`,
                    borderRadius: 10, background: theme.bg, color: theme.ink,
                    outline: 'none',
                  }}
                />
                <Btn variant="primary" theme={theme}
                  onClick={(e) => sendReport(e)}
                  style={{ opacity: validEmail && !sending ? 1 : 0.5, cursor: validEmail && !sending ? 'pointer' : 'not-allowed' }}>
                  {sending ? t('Sending…', '发送中…') : t('Send', '发送')}
                </Btn>
              </div>
              {sendError && <div style={{ fontSize: 12.5, color: A.mauve, marginTop: 8 }}>{sendError}</div>}
              <div style={{ fontSize: 12, color: theme.inkMuted, marginTop: 10, lineHeight: 1.5 }}>
                {t(
                  <>We send it once and use the address only for this report. We don’t add you to a mailing list. <a href="/privacy.html" style={{ color: theme.inkMuted, textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy</a>.</>,
                  <>我们只发送一次，邮箱只用于本次报告。我们不会把你加入邮件列表。<a href="/privacy.html" style={{ color: theme.inkMuted, textDecoration: 'underline', textUnderlineOffset: 2 }}>隐私政策</a>。</>
                )}
              </div>
            </form>
          )}

          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn variant="primary" theme={theme} onClick={() => go('landing')}>{t('Back to home', '返回首页')}</Btn>
            <Btn theme={theme} onClick={() => { reset(); go('quiz'); }}>{t('Retake check', '重新评估')}</Btn>
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.ResultsScreen = ResultsScreen;

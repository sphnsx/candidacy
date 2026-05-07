/* global React, Bullet, useNav, useLang, useAnswers, calculateResult, MFrame, MTopBar, MFooter, MBtn, MEyebrow, MHeader, PALETTE */
// Mobile results — renders the production calculateResult output with the
// design's eyebrow / serif headline / metric strip / hint cards / email gate.
// Includes the imbalance line and evidence-gate summary set by the engine.

const M_RES_T = {
  topbar:    { en: 'Your Candidacy Scan', zh: 'Candidacy 体检' },
  eyebrow:   { en: 'Diagnosis · what is', zh: '诊断 · 现状是什么' },
  primary:   { en: 'Primary route', zh: '主路径' },
  metrics_h: { en: 'Three dimensions', zh: '三个维度' },
  evidence:    { en: 'Evidence',     zh: '证据' },
  recommenders:{ en: 'Recommenders', zh: '推荐人' },
  readiness:   { en: 'Readiness',    zh: '准备状态' },
  hints_h:   { en: 'Where the diagnostic flagged risk', zh: '诊断中显现的风险点' },
  hints_empty: {
    en: 'No structural red flags surfaced. The findings sit at the level of refinement, not reconstruction.',
    zh: '当前没有结构性红旗。发现停留在打磨层面，而非重建层面。',
  },
  next_h:    { en: 'Where the diagnostic points', zh: '诊断指向的方向' },
  next_intro:{
    en: 'Directional pointers for your band — not case-specific strategy. Specific opportunity selection, evidence prioritisation, and sequenced timelines sit inside the full Candidacy.',
    zh: '面向你这个 band 的方向性提示——不构成针对你具体案例的策略建议。具体机会筛选、证据优先级与时间线属于完整 Candidacy 的范围。',
  },
  alt_h:     { en: 'Alternate routes', zh: '其他路径' },
  email_h:   { en: 'Email me this report', zh: '把报告发给我' },
  email_send:    { en: 'Send', zh: '发送' },
  email_sending: { en: 'Sending…', zh: '发送中…' },
  email_sent:    { en: (e) => `Sent to ${e}. Check your inbox.`, zh: (e) => `已发送至 ${e}，请查收邮箱。` },
  email_fail:    { en: 'Send failed. Please try again.', zh: '发送失败，请稍后再试。' },
  email_priv:    {
    en: 'We send it once and use the address only for this report. We don’t add you to a mailing list.',
    zh: '我们只发送一次，邮箱只用于本次报告。我们不会把你加入邮件列表。',
  },
  email_why:     { en: 'Why we ask for your email', zh: '为什么我们要邮箱' },
  email_explain: {
    en: 'So you can come back to this Scan, and so we can notify you of one thing only — when the maintained reference base materially changes the read on your profile. No marketing.',
    zh: '为了你能再回到这份体检，以及只在一件事上联系你——当持续维护的参考库实质性改变了对你 profile 的解读时。不发营销邮件。',
  },
  unlock_cta:{ en: 'See what unlock includes', zh: '查看解锁后包含什么' },
  past_diag: { en: 'Past diagnosis?',           zh: '已读完诊断？' },
  retake:    { en: 'Retake the scan',           zh: '重新评估' },
  home:      { en: 'Back to home',              zh: '返回首页' },
  band_low:  { en: 'initial', zh: '初步' },
  band_mid:  { en: 'mid', zh: '中段' },
  band_high: { en: 'strong', zh: '靠前' },
};

function MResultsScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const { answers, reset } = useAnswers();
  const t = (k, ...args) => {
    const v = M_RES_T[k];
    if (!v) return k;
    const fn = v[lang] || v.en;
    return typeof fn === 'function' ? fn(...args) : fn;
  };

  const result = React.useMemo(() => calculateResult(answers, lang), [answers, lang]);
  const score = result.total;
  const primary = result.primary;

  // Axis imbalance copy — same shape logic as desktop.
  const axisPcts = [
    { key: 'evidence',     pct: (result.metrics.evidence     || 0) / 40, label: { en: 'evidence base',       zh: '证据基础' } },
    { key: 'recommenders', pct: (result.metrics.recommenders || 0) / 30, label: { en: 'recommender network', zh: '推荐人网络' } },
    { key: 'readiness',    pct: (result.metrics.readiness    || 0) / 30, label: { en: 'readiness & narrative', zh: '准备状态与叙述' } },
  ];
  const sortedAxes = [...axisPcts].sort((a, b) => a.pct - b.pct);
  const [weakAxis, midAxis, strongAxis] = sortedAxes;
  const overallGap = strongAxis.pct - weakAxis.pct;
  const wmGap = midAxis.pct - weakAxis.pct;
  const msGap = strongAxis.pct - midAxis.pct;
  const wL = weakAxis.label[lang] || weakAxis.label.en;
  const mL = midAxis.label[lang]  || midAxis.label.en;
  const sL = strongAxis.label[lang] || strongAxis.label.en;
  let imbalanceNote = null;
  if (overallGap >= 0.15) {
    if (wmGap >= msGap + 0.15) {
      imbalanceNote = lang === 'zh'
        ? `${mL}和${sL}明显强于${wL}——总分反映的是这种不平衡，而不是单一最弱项。`
        : `${mL} and ${sL} read notably stronger than ${wL} — the overall score reflects that gap, not just one weakest area.`;
    } else if (msGap >= wmGap + 0.15) {
      imbalanceNote = lang === 'zh'
        ? `${sL}明显强于${wL}和${mL}——总分反映的是这种不平衡，而不是只看单一最强项。`
        : `${sL} reads notably stronger than ${wL} and ${mL} — the overall score reflects that gap, not a single strong area.`;
    } else {
      imbalanceNote = lang === 'zh'
        ? `${sL}方面比${wL}方面更稳——总分反映的是这种不平衡。`
        : `Stronger on ${sL} than on ${wL} — the overall score reflects that gap.`;
    }
  }

  const bandLabel = result.band === 'low' ? t('band_low') : result.band === 'mid' ? t('band_mid') : t('band_high');

  // Email gate
  const [email, setEmail] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [sendError, setSendError] = React.useState('');
  const [whyOpen, setWhyOpen] = React.useState(false);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function sendReport(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!validEmail || sending) return;
    setSending(true); setSendError('');
    try {
      const payload = {
        email, lang,
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
      const res = await fetch('/api/send-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSent(true);
    } catch (err) {
      setSendError(t('email_fail'));
    } finally {
      setSending(false);
    }
  }

  const axes = [
    { id: 'evidence',     label: t('evidence'),     color: PALETTE.yellow, value: result.metrics.evidence,     max: 40 },
    { id: 'recommenders', label: t('recommenders'), color: PALETTE.mint,   value: result.metrics.recommenders, max: 30 },
    { id: 'readiness',    label: t('readiness'),    color: PALETTE.violet, value: result.metrics.readiness,    max: 30 },
  ];

  return (
    <MFrame theme={theme}>
      <MTopBar theme={theme} title={t('topbar')} />

      <div style={{ padding: '20px 18px 8px' }}>
        <MEyebrow theme={theme} color={A}>{t('eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={26}>
          {primary.summary}
        </MHeader>
        {imbalanceNote && (
          <p style={{
            margin: '14px 0 8px', fontSize: 14, fontWeight: 500, lineHeight: 1.5,
            color: theme.ink, textWrap: 'pretty',
          }}>{imbalanceNote}</p>
        )}
        <p style={{ margin: '6px 0 0', fontSize: 12.5, color: theme.inkMuted, textWrap: 'pretty' }}>
          {t('primary')}: {primary.label}.
        </p>
      </div>

      {/* Score hub */}
      <div style={{ padding: '20px 18px 0', display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: theme.bg, border: `2px solid ${A}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 6px ${A}14`,
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: theme.serif || '"Source Serif 4",serif',
            fontSize: 42, fontWeight: 400, color: theme.ink, letterSpacing: '-0.03em', lineHeight: 1,
          }}>{score}</div>
          <div style={{ fontFamily: 'Geist', fontSize: 9.5, color: theme.inkMuted, marginTop: 2 }}>
            / 100 · {bandLabel}
          </div>
        </div>
        <div style={{ flex: 1, display: 'grid', gap: 8 }}>
          {axes.map(ax => (
            <div key={ax.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Geist', fontSize: 12, fontWeight: 600, color: theme.ink }}>
                  <Bullet color={ax.color} size={8} />{ax.label}
                </span>
                <span style={{ fontFamily: 'Geist', fontSize: 11.5, color: theme.inkMuted }}>
                  <strong style={{ color: theme.ink, fontWeight: 600 }}>{ax.value}</strong> / {ax.max}
                </span>
              </div>
              <div style={{ height: 3, background: theme.hairlineFaint, borderRadius: 2 }}>
                <div style={{
                  width: `${Math.min(100, (ax.value / ax.max) * 100)}%`,
                  height: '100%', background: ax.color, borderRadius: 2,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hints */}
      <div style={{ padding: '24px 18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Bullet color={PALETTE.tan} size={9} />
          <span style={{ fontFamily: 'Geist', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.inkMuted }}>
            {t('hints_h')}
          </span>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {(result.hints && result.hints.length ? result.hints : [t('hints_empty')]).map((h, i) => (
            <div key={i} style={{
              fontSize: 13, lineHeight: 1.5, color: theme.ink,
              padding: '12px 14px', borderRadius: 12,
              border: `1px solid ${theme.hairlineFaint}`, background: theme.bg,
            }}>{h}</div>
          ))}
        </div>
      </div>

      {/* Pointers / next steps */}
      {result.nextSteps && result.nextSteps.length > 0 && (
        <div style={{ padding: '20px 18px 8px', background: theme.surface || theme.hairlineFaint + '40', borderTop: `1px solid ${theme.hairlineFaint}`, borderBottom: `1px solid ${theme.hairlineFaint}`, marginTop: 16 }}>
          <MEyebrow theme={theme} color={A}>{t('next_h')}</MEyebrow>
          <p style={{ margin: '4px 0 14px', fontSize: 12, lineHeight: 1.5, color: theme.inkMuted, textWrap: 'pretty' }}>
            {t('next_intro')}
          </p>
          <div style={{ display: 'grid', gap: 14, paddingBottom: 16 }}>
            {result.nextSteps.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 12 }}>
                <Bullet color={[PALETTE.yellow, PALETTE.mint, PALETTE.violet, PALETTE.tan][i % 4]} size={11} style={{ marginTop: 5 }} />
                <div>
                  <div style={{
                    fontFamily: 'Geist', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                    color: theme.inkMuted, marginBottom: 3,
                  }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontSize: 13, color: theme.ink, lineHeight: 1.5 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternates */}
      {result.alternates && result.alternates.length > 0 && (
        <div style={{ padding: '20px 18px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Bullet color={PALETTE.lilac} size={9} />
            <span style={{ fontFamily: 'Geist', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.inkMuted }}>
              {t('alt_h')}
            </span>
          </div>
          <div style={{ display: 'grid', gap: 0 }}>
            {result.alternates.slice(0, 3).map((r, i) => (
              <div key={r.field} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0', borderTop: i === 0 ? `1px solid ${theme.hairlineFaint}` : 'none', borderBottom: `1px solid ${theme.hairlineFaint}`,
              }}>
                <Bullet color={[PALETTE.teal, PALETTE.lilac, PALETTE.tan][i % 3]} size={9} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Geist', fontSize: 13.5, fontWeight: 600, color: theme.ink }}>{r.label}</div>
                  <div style={{ fontSize: 11.5, color: theme.inkMuted, lineHeight: 1.4, marginTop: 2 }}>{r.summary}</div>
                </div>
                <span style={{ fontFamily: 'Geist', fontSize: 16, fontWeight: 600, color: theme.ink, letterSpacing: '-0.02em' }}>{r.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email gate */}
      <div style={{ padding: '20px 18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Bullet color={A} size={9} />
          <span style={{ fontFamily: 'Geist', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.inkMuted }}>
            {t('email_h')}
          </span>
        </div>
        {sent ? (
          <div style={{
            padding: '12px 14px', borderRadius: 12,
            border: `1px solid ${theme.hairlineFaint}`, background: theme.bg,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Bullet color={PALETTE.mint} size={10} />
            <span style={{ fontSize: 13, color: theme.ink }}>{t('email_sent', email)}</span>
          </div>
        ) : (
          <form onSubmit={sendReport}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={lang === 'zh' ? '你的邮箱' : 'your@email.com'}
                required
                style={{
                  flex: 1, fontFamily: 'Geist', fontSize: 13, padding: '11px 14px',
                  border: `1px solid ${theme.hairline}`, borderRadius: 999, outline: 'none',
                  color: theme.ink, background: theme.bg, minWidth: 0,
                }}
              />
              <MBtn theme={theme} variant="primary" onClick={sendReport} style={{
                padding: '11px 18px', fontSize: 13, minHeight: 0,
                opacity: validEmail && !sending ? 1 : 0.5,
                pointerEvents: validEmail && !sending ? 'auto' : 'none',
              }}>
                {sending ? t('email_sending') : t('email_send')}
              </MBtn>
            </div>
            {sendError && <div style={{ fontSize: 12, color: PALETTE.mauve, marginTop: 8 }}>{sendError}</div>}
            <button type="button" onClick={() => setWhyOpen(o => !o)} style={{
              appearance: 'none', border: 'none', background: 'transparent', padding: 0,
              marginTop: 10, cursor: 'pointer',
              fontFamily: 'Geist', fontSize: 11.5, color: theme.inkMuted,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ transform: whyOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', display: 'inline-block' }}>›</span>
              {t('email_why')}
            </button>
            {whyOpen && (
              <p style={{ margin: '8px 0 0', fontSize: 11.5, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
                {t('email_explain')}
              </p>
            )}
            <p style={{ margin: '10px 0 0', fontSize: 11.5, lineHeight: 1.5, color: theme.inkMuted }}>
              {t('email_priv')}
            </p>
          </form>
        )}
      </div>

      {/* Bottom CTAs — free-Scan flow stays primary. */}
      <div style={{ padding: '20px 18px 12px', display: 'grid', gap: 8 }}>
        <MBtn theme={theme} variant="primary" fullWidth onClick={() => go('landing')}>{t('home')}</MBtn>
        <MBtn theme={theme} variant="ghost" fullWidth onClick={() => { reset(); go('quiz'); }}>{t('retake')}</MBtn>
      </div>
      {/* Paid-tier entrance — quieter, set off by a hairline. */}
      <div style={{ padding: '0 18px 28px' }}>
        <div style={{
          paddingTop: 16,
          borderTop: `1px solid ${theme.hairlineFaint}`,
          fontSize: 12, color: theme.inkMuted, lineHeight: 1.5,
        }}>
          <span style={{ fontStyle: 'italic' }}>{t('past_diag')}</span>{' '}
          <a onClick={() => go('unlock')} style={{
            color: theme.inkMuted, textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer',
          }}>
            {t('unlock_cta')} →
          </a>
        </div>
      </div>

      <MFooter theme={theme} />
    </MFrame>
  );
}

window.MResultsScreen = MResultsScreen;

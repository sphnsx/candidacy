/* global React, Bullet, StatusPill, useNav, useLang, MFrame, MTopBar, MFooter, MBtn, MEyebrow, MHeader, PALETTE, mt */
// Mobile Preview-and-Unlock teaser. Same funnel as desktop, mobile layout.
// Pricing strictly per CANDIDACY_NOTES: £349 launch / £499 regular.

const M_UNL_T = {
  topbar: { en: 'Unlock Full Candidacy', zh: '解锁 Full Candidacy' },
  eyebrow: { en: 'Preview-and-Unlock', zh: 'Preview-and-Unlock' },
  title: {
    en: ['Pay once. ', 'Preview first', '. Decide whether to unlock — or walk away with a full refund.'],
    zh: ['一次付费。', '先看预览', '。再决定是否解锁——或带着全额退款离开。'],
  },
  body: {
    en: 'You don’t commit to the full Candidacy before seeing how your case is read. Within 24–48 hours of purchase, your Candidacy Preview lands. You then have 7 days to unlock — or refund.',
    zh: '在看到系统如何读你的案例之前，你不必承诺完整 Candidacy。付款后 24–48 小时内，Candidacy Preview 抵达。你有 7 天选择解锁——或退款。',
  },
  s1_t: { en: '1 · Purchase + intake', zh: '1 · 付款与 intake' }, s1_meta: { en: 'Immediate', zh: '即时' },
  s1_b: { en: 'Pay £349, complete a ~30-min structured intake.', zh: '付款 £349，完成约 30 分钟结构化 intake。' },
  s2_t: { en: '2 · Candidacy Preview',  zh: '2 · Candidacy 预览' }, s2_meta: { en: '24–48 h', zh: '24–48 小时' },
  s2_b: { en: 'Deeper diagnosis. Strengths, weaknesses, gaps, risk flags + one-line strategic direction.', zh: '深度诊断。强项、弱项、缺口、风险标记 + 一句话策略方向。' },
  s3_t: { en: '3 · Decide', zh: '3 · 决定' }, s3_meta: { en: '7 days', zh: '7 天内' },
  s3_b: { en: 'Unlock the full Candidacy, or take a no-questions refund and keep the preview.', zh: '解锁完整 Candidacy，或申请无理由退款并保留预览。' },
  s4_t: { en: '4 · Full Candidacy + 1 free update', zh: '4 · Full Candidacy + 一次免费更新' }, s4_meta: { en: '14-day window', zh: '14 天窗口' },
  s4_b: { en: 'Strategy, opportunity shortlist, evidence plan, 30/60/90-day pipeline. + 1 update within 14 days.', zh: '策略、机会 shortlist、证据计划、30/60/90 天 pipeline。+ 14 天内一次更新。' },

  price_lbl:    { en: 'Launch price · founding cohort', zh: '首发价 · founding cohort' },
  price_main:   { en: '£349', zh: '£349' },
  price_strike: { en: '£499 regular', zh: '常规价 £499' },
  price_anchor: { en: 'Below the £766 GTV application fee. Far below the £2k+ vanity-evidence category.', zh: '低于 £766 的 GTV 申请费。远低于 £2k+ 的 vanity evidence 类目。' },

  cta:    { en: 'See what the Preview shows', zh: '查看预览包含什么' },
  refund: { en: 'Refund policy', zh: '退款政策' },
  refund_body: {
    en: 'Pre-preview: full refund, no questions. Pre-unlock (7 days): full refund. Post-unlock (14 days): refund only if components are missing. After 14 days: statutory rights only (Consumer Rights Act 2015).',
    zh: '预览前：全额退款，不问理由。解锁前（7 天）：全额退款。解锁后（14 天）：仅在组件缺失时退款。14 天后：仅适用法定权益（Consumer Rights Act 2015）。',
  },
};

function MUnlockScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const t = (k) => { const v = M_UNL_T[k]; return v ? (v[lang] || v.en) : k; };

  const stages = [
    { t: t('s1_t'), m: t('s1_meta'), b: t('s1_b'), c: PALETTE.mint },
    { t: t('s2_t'), m: t('s2_meta'), b: t('s2_b'), c: PALETTE.yellow },
    { t: t('s3_t'), m: t('s3_meta'), b: t('s3_b'), c: PALETTE.tan },
    { t: t('s4_t'), m: t('s4_meta'), b: t('s4_b'), c: A },
  ];

  return (
    <MFrame theme={theme}>
      <MTopBar theme={theme} showBack onBack={() => go('results')} title={t('topbar')} />

      <div style={{ padding: '22px 18px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <StatusPill theme={theme} color={PALETTE.tan}>{mt('coming_soon', lang)}</StatusPill>
        </div>
        <MEyebrow theme={theme} color={A}>{t('eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={26}>
          {t('title')[0]}
          <em style={{ fontStyle: 'italic', color: A, fontWeight: 400 }}>{t('title')[1]}</em>
          {t('title')[2]}
        </MHeader>
        <p style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
          {t('body')}
        </p>
      </div>

      {/* 4-stage timeline */}
      <div style={{ padding: '0 18px 24px' }}>
        <div style={{ display: 'grid', gap: 10 }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '24px 1fr', gap: 12, alignItems: 'start',
              border: `1px solid ${theme.hairlineFaint}`, borderRadius: 12,
              padding: '14px 14px 14px 16px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <Bullet color={s.c} size={11} />
                {i < 3 && <div style={{ width: 1, flex: 1, minHeight: 22, background: theme.hairlineFaint, marginTop: 4 }} />}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 13.5, color: theme.ink, letterSpacing: '-0.005em' }}>{s.t}</span>
                  <span style={{ fontFamily: 'Geist', fontSize: 10.5, fontWeight: 500, color: theme.inkMuted, whiteSpace: 'nowrap' }}>{s.m}</span>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.5, color: theme.inkMuted, textWrap: 'pretty' }}>{s.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div style={{ padding: '20px 18px 24px', background: theme.surface || theme.hairlineFaint + '40', borderTop: `1px solid ${theme.hairlineFaint}`, borderBottom: `1px solid ${theme.hairlineFaint}` }}>
        <div style={{ fontFamily: 'Geist', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 8 }}>
          {t('price_lbl')}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: theme.serif || '"Source Serif 4","Noto Serif SC",serif', fontSize: 44, fontWeight: 400, color: theme.ink, letterSpacing: '-0.03em' }}>{t('price_main')}</span>
          <span style={{ fontFamily: 'Geist', fontSize: 13, color: theme.inkMuted, textDecoration: 'line-through' }}>{t('price_strike')}</span>
        </div>
        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: theme.inkMuted, textWrap: 'pretty' }}>{t('price_anchor')}</p>
      </div>

      {/* Refund */}
      <div style={{ padding: '20px 18px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Bullet color={PALETTE.mint} size={8} />
          <span style={{ fontFamily: 'Geist', fontSize: 11.5, fontWeight: 600, color: theme.ink, letterSpacing: '-0.005em' }}>{t('refund')}</span>
        </div>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>{t('refund_body')}</p>
      </div>

      <div style={{ padding: '12px 18px 32px' }}>
        <MBtn theme={theme} variant="primary" fullWidth onClick={() => go('preview')}>
          {t('cta')} →
        </MBtn>
      </div>

      <MFooter theme={theme} />
    </MFrame>
  );
}

window.MUnlockScreen = MUnlockScreen;

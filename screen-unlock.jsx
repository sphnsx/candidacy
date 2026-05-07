/* global React, Bullet, Btn, Frame, TopNav, Footer, StatusPill, useNav, useLang, PALETTE */
// Desktop Preview-and-Unlock teaser. Shown after the free Scan to explain
// what £349 buys and how the funnel runs (purchase → preview → decide → full).
// Pricing strictly per CANDIDACY_NOTES: £349 launch / £499 regular.

const D_UNL_T = {
  eyebrow: { en: 'Preview-and-Unlock', zh: 'Preview-and-Unlock' },
  title: { en: ['Pay once. ', 'Preview first', '.'], zh: ['一次付费。', '先看预览', '。'] },
  body: {
    en: 'You don’t commit to the full Candidacy before seeing how your case is read. Pay £349, complete a 30-min intake, and within 24–48 hours your Candidacy Preview lands. You then have 7 days to unlock — or take a no-questions refund.',
    zh: '在看到系统如何读你的案例之前，你不必承诺完整 Candidacy。付款 £349，完成 30 分钟 intake，24–48 小时内 Preview 抵达。你有 7 天时间解锁——或申请无理由退款。',
  },
  s1_t: { en: '01 · Purchase + intake',           zh: '01 · 付款与 intake' },
  s1_m: { en: 'Immediate',                         zh: '即时' },
  s1_b: { en: '£349 launch / £499 regular. Structured intake captures profile, evidence, timing.', zh: '首发 £349 / 常规 £499。结构化 intake 收集 profile、证据、时间窗。' },
  s2_t: { en: '02 · Candidacy Preview',            zh: '02 · Candidacy 预览' },
  s2_m: { en: '24–48 h',                           zh: '24–48 小时' },
  s2_b: { en: 'Strengths, weaknesses, gaps, risk flags + a one-line strategic direction.', zh: '强项、弱项、缺口、风险标记 + 一句话策略方向。' },
  s3_t: { en: '03 · Decide',                       zh: '03 · 决定' },
  s3_m: { en: '7 days',                            zh: '7 天内' },
  s3_b: { en: 'Unlock the full Candidacy, or take a full refund and keep the preview.', zh: '解锁完整 Candidacy，或全额退款并保留预览。' },
  s4_t: { en: '04 · Full Candidacy + 1 free update', zh: '04 · Full Candidacy + 一次免费更新' },
  s4_m: { en: '14-day window',                     zh: '14 天窗口' },
  s4_b: { en: 'Strategy, opportunity shortlist, evidence plan, 30/60/90-day pipeline.', zh: '策略、机会 shortlist、证据计划、30/60/90 天 pipeline。' },
  price_lbl: { en: 'Launch price · founding cohort', zh: '首发价 · founding cohort' },
  price_anchor: { en: 'Below the £766 GTV application fee. Far below the £2k+ vanity-evidence category.', zh: '低于 £766 GTV 申请费。远低于 £2k+ vanity evidence 类目。' },
  price_strike: { en: '£499 regular', zh: '常规价 £499' },
  cta: { en: 'See Preview vs. Full', zh: '查看 Preview vs. Full' },
  back: { en: 'Back to my Scan', zh: '回到我的体检' },
  coming_soon: { en: 'Coming soon · planned launch', zh: '即将推出 · 计划中' },
  refund: { en: 'Refund policy', zh: '退款政策' },
  refund_b: {
    en: 'Pre-preview: full refund. Pre-unlock (7 d): full refund. Post-unlock (14 d): refund only if components are missing. After 14 d: statutory rights only.',
    zh: '预览前：全额退款。解锁前（7 天）：全额退款。解锁后（14 天）：仅在组件缺失时退款。14 天后：仅适用法定权益。',
  },
};

function UnlockScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const t = (k) => { const v = D_UNL_T[k]; return v ? (v[lang] || v.en) : k; };

  const stages = [
    { t: t('s1_t'), m: t('s1_m'), b: t('s1_b'), c: PALETTE.mint },
    { t: t('s2_t'), m: t('s2_m'), b: t('s2_b'), c: PALETTE.yellow },
    { t: t('s3_t'), m: t('s3_m'), b: t('s3_b'), c: PALETTE.tan },
    { t: t('s4_t'), m: t('s4_m'), b: t('s4_b'), c: A },
  ];

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="" />

      <div style={{ padding: '64px 56px 28px' }}>
        <div style={{ marginBottom: 14 }}>
          <StatusPill theme={theme} color={PALETTE.tan}>{t('coming_soon')}</StatusPill>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Bullet color={A} size={10} />
          <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', color: theme.inkMuted }}>
            {t('eyebrow')}
          </span>
        </div>
        <h1 style={{
          fontFamily: theme.serif, fontWeight: 400, fontSize: 76, letterSpacing: '-0.025em',
          margin: '0 0 18px', lineHeight: 1.02, maxWidth: 1080, textWrap: 'balance', color: theme.ink,
        }}>
          {t('title')[0]}
          <em style={{ fontStyle: 'italic', color: A }}>{t('title')[1]}</em>
          {t('title')[2]}
        </h1>
        <p style={{ color: theme.inkMuted, fontSize: 17, maxWidth: 760, margin: 0, lineHeight: 1.55, textWrap: 'pretty' }}>
          {t('body')}
        </p>
      </div>

      {/* 4-stage strip */}
      <div style={{ padding: '24px 56px 48px', borderTop: `1px solid ${theme.hairlineFaint}`, borderBottom: `1px solid ${theme.hairlineFaint}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {stages.map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Bullet color={s.c} size={12} />
                <span style={{ fontFamily: 'Geist', fontSize: 11, fontWeight: 600, color: theme.inkMuted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.m}</span>
              </div>
              <div style={{ fontFamily: 'Geist', fontSize: 18, fontWeight: 600, color: theme.ink, letterSpacing: '-0.012em', marginBottom: 8, lineHeight: 1.2 }}>{s.t}</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>{s.b}</p>
              {i < 3 && (
                <div style={{ position: 'absolute', top: 6, right: -14, width: 28, borderTop: `1px dashed ${theme.hairline}` }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price + refund */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr' }}>
        <div style={{ padding: '56px 56px', borderRight: `1px solid ${theme.hairlineFaint}` }}>
          <div style={{ fontFamily: 'Geist', fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 16 }}>
            {t('price_lbl')}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 14 }}>
            <span style={{ fontFamily: theme.serif, fontSize: 112, fontWeight: 400, color: theme.ink, letterSpacing: '-0.035em', lineHeight: 1 }}>£349</span>
            <span style={{ fontFamily: 'Geist', fontSize: 16, color: theme.inkMuted, textDecoration: 'line-through' }}>{t('price_strike')}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: theme.inkMuted, maxWidth: 520, textWrap: 'pretty' }}>{t('price_anchor')}</p>
          <div style={{ marginTop: 30, display: 'flex', gap: 10 }}>
            <Btn variant="primary" theme={theme} onClick={() => go('preview')}>{t('cta')} →</Btn>
            <Btn theme={theme} onClick={() => go('results')}>{t('back')}</Btn>
          </div>
        </div>

        <div style={{ padding: '56px 56px', background: theme.surface }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Bullet color={PALETTE.mint} size={10} />
            <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.ink }}>{t('refund')}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: theme.inkMuted, textWrap: 'pretty' }}>{t('refund_b')}</p>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.UnlockScreen = UnlockScreen;

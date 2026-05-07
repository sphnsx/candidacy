/* global React, Bullet, useNav, useLang, MFrame, MTopBar, MFooter, MBtn, MEyebrow, MHeader, MLock, PALETTE */
// Mobile Preview vs Full Candidacy. Same content as desktop, mobile layout.

const M_PRV_T = {
  topbar: { en: 'Preview vs. Full Candidacy', zh: 'Preview vs. Full Candidacy' },
  eyebrow: { en: 'What you see — and don’t', zh: '你能看到什么——以及看不到什么' },
  title: {
    en: ['The line is sharp. ', 'Diagnosis', ' in the Preview. Prescription in the unlock.'],
    zh: ['边界清晰。预览中是', '诊断', '，解锁后是处方。'],
  },
  body: {
    en: 'A user who reads the Preview knows roughly where they stand. A user who unlocks knows what to do about it — in what order, why, and at what cost.',
    zh: '读完预览的用户大致知道自己在哪。解锁的用户知道接下来该做什么、按什么顺序、为什么、代价是什么。',
  },
  prv_h: { en: 'Candidacy Preview · included',     zh: 'Candidacy 预览 · 包含' },
  ful_h: { en: 'Full Candidacy · unlocks',         zh: 'Full Candidacy · 解锁后' },
  cta:   { en: 'Get started — £349',                zh: '开始 —— £349' },
  cta_alt: { en: 'Back to my Scan',                  zh: '回到我的体检' },
  guarantee: {
    en: 'Honest analysis is the product. We do not predict endorsement, do not guarantee outcomes, and do not cooperate with vanity-evidence services.',
    zh: '诚实分析本身就是产品。我们不预测 endorsement，不承诺结果，也不与 vanity evidence 服务合作。',
  },
};

function MPreviewScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const t = (k) => { const v = M_PRV_T[k]; return v ? (v[lang] || v.en) : k; };

  const previewItems = lang === 'zh' ? [
    'Profile 与 ACE 路径范围契合度',
    '当前强项',
    '当前弱项',
    '已识别的证据缺口',
    '风险标记（vanity / 学生作品 / 单一类别等）',
    '一句话策略方向',
  ] : [
    'How your profile fits ACE pathway scope',
    'Current strengths',
    'Current weaknesses',
    'Identified evidence gaps',
    'Risk flags (vanity / student-work / single-category)',
    'One-line statement of strategic direction',
  ];

  const fullItems = lang === 'zh' ? [
    { t: 'Strategy & Targeting', d: '具体机会 shortlist，标注「建议追 / 可选 / 不建议」' },
    { t: '30/60/90 天行动计划',   d: '按 deadline 排序，标注每周重点' },
    { t: '证据策略',              d: '现有证据如何调度 + 优先建设哪些新证据' },
    { t: 'Effort/impact 排序',    d: '每项推荐行动按投入与贡献排序' },
    { t: '推荐信策略与 referee 指引', d: '具体到信件结构与人选画像' },
    { t: '14 天内一次免费更新',    d: '提交补充材料，相应部分重新生成' },
  ] : [
    { t: 'Strategy & Targeting', d: 'Specific opportunity shortlist, labelled worth-pursuing / optional / not-recommended' },
    { t: '30/60/90-day action plan', d: 'Sequenced by deadline, with weekly focus' },
    { t: 'Evidence strategy', d: 'How to deploy what you have + what to prioritise building' },
    { t: 'Effort / impact prioritisation', d: 'Every recommended action ranked by cost and contribution' },
    { t: 'Letter strategy + referee guidance', d: 'Down to letter structure and referee profile' },
    { t: '1 free update within 14 days', d: 'Submit context, the affected parts regenerate' },
  ];

  return (
    <MFrame theme={theme}>
      <MTopBar theme={theme} showBack onBack={() => go('unlock')} title={t('topbar')} />

      <div style={{ padding: '22px 18px 24px' }}>
        <MEyebrow theme={theme} color={A}>{t('eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={24}>
          {t('title')[0]}
          <em style={{ fontStyle: 'italic', color: A, fontWeight: 400 }}>{t('title')[1]}</em>
          {t('title')[2]}
        </MHeader>
        <p style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
          {t('body')}
        </p>
      </div>

      {/* PREVIEW — checkmark list */}
      <div style={{ padding: '8px 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Bullet color={PALETTE.mint} size={9} />
          <span style={{ fontFamily: 'Geist', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.ink }}>{t('prv_h')}</span>
        </div>
        <div style={{ border: `1px solid ${theme.hairlineFaint}`, borderRadius: 12, overflow: 'hidden' }}>
          {previewItems.map((it, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '18px 1fr', gap: 10, alignItems: 'center',
              padding: '11px 14px',
              borderTop: i === 0 ? 'none' : `1px solid ${theme.hairlineFaint}`,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7 L6 11 L12 3" stroke={PALETTE.mint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 12.5, color: theme.ink, lineHeight: 1.4 }}>{it}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FULL — locked cards */}
      <div style={{ padding: '4px 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Bullet color={A} size={9} />
          <span style={{ fontFamily: 'Geist', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.ink }}>{t('ful_h')}</span>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {fullItems.map((it, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '18px 1fr', gap: 10, alignItems: 'start',
              padding: '12px 14px', borderRadius: 10,
              border: `1px solid ${theme.hairlineFaint}`,
              background: theme.bg,
            }}>
              <div style={{ paddingTop: 1 }}><MLock theme={theme} size={13} /></div>
              <div>
                <div style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 13, color: theme.ink, letterSpacing: '-0.005em' }}>{it.t}</div>
                <div style={{ fontSize: 11.5, color: theme.inkMuted, marginTop: 3, lineHeight: 1.45 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantee */}
      <div style={{ padding: '4px 18px 16px' }}>
        <div style={{
          padding: 12, borderRadius: 10,
          background: theme.surface || theme.hairlineFaint + '40',
          border: `1px dashed ${theme.hairline}`,
        }}>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
            {t('guarantee')}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 18px 32px', display: 'grid', gap: 8 }}>
        <MBtn theme={theme} variant="primary" fullWidth onClick={() => {}}>{t('cta')}</MBtn>
        <MBtn theme={theme} variant="ghost" fullWidth onClick={() => go('results')}>{t('cta_alt')}</MBtn>
      </div>

      <MFooter theme={theme} />
    </MFrame>
  );
}

window.MPreviewScreen = MPreviewScreen;

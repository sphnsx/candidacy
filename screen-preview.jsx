/* global React, Bullet, Btn, Frame, TopNav, Footer, StatusPill, useNav, useLang, PALETTE */
// Desktop Preview vs Full Candidacy. Two-column comparison: what's in the
// paid Preview vs what unlocks with Full Candidacy. Diagnosis vs prescription.

const D_PRV_T = {
  eyebrow: { en: 'Preview vs. Full Candidacy', zh: 'Preview vs. Full Candidacy' },
  title: { en: ['Diagnosis in the Preview. ', 'Prescription', ' in the unlock.'], zh: ['预览中是诊断。解锁后是', '处方', '。'] },
  body: {
    en: 'A user who reads the Preview knows roughly where they stand. A user who unlocks knows what to do about it — in what order, why, and at what cost.',
    zh: '读完预览的用户大致知道自己在哪。解锁的用户知道接下来该做什么、按什么顺序、为什么、代价是什么。',
  },
  prv_h: { en: 'Candidacy Preview · included',  zh: 'Candidacy 预览 · 包含' },
  ful_h: { en: 'Full Candidacy · unlocks',       zh: 'Full Candidacy · 解锁后' },
  cta:   { en: 'Notify me when this launches',   zh: '上线时通知我' },
  back:  { en: 'Back to Preview-and-Unlock',     zh: '回到 Preview-and-Unlock' },
  coming_soon: { en: 'Coming soon · planned launch', zh: '即将推出 · 计划中' },
  guarantee: {
    en: 'Honest analysis is the product. We do not predict endorsement, do not guarantee outcomes, and do not cooperate with vanity-evidence services.',
    zh: '诚实分析本身就是产品。我们不预测 endorsement，不承诺结果，也不与 vanity evidence 服务合作。',
  },
};

function PreviewScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const t = (k) => { const v = D_PRV_T[k]; return v ? (v[lang] || v.en) : k; };

  const previewItems = lang === 'zh' ? [
    'Profile 与 ACE 路径范围契合度',
    '当前强项',
    '当前弱项',
    '已识别的证据缺口',
    '风险标记（vanity / 学生作品 / 单一类别）',
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
    { t: 'Strategy & Targeting',       d: '具体机会 shortlist，标注「建议追 / 可选 / 不建议」及理由' },
    { t: '30/60/90 天 pipeline',         d: '按 deadline 排序，标注每周重点' },
    { t: '证据策略',                    d: '现有证据如何调度 + 优先建设哪些新证据' },
    { t: 'Effort/impact 排序',          d: '每项推荐行动按投入与贡献排序' },
    { t: '推荐信策略与 referee 指引',     d: '具体到信件结构与人选画像' },
    { t: '14 天内一次免费更新',          d: '提交补充材料，相应部分重新生成' },
  ] : [
    { t: 'Strategy & Targeting',         d: 'Opportunity shortlist labelled worth-pursuing / optional / not-recommended, with reasons' },
    { t: '30 / 60 / 90-day pipeline',     d: 'Sequenced by deadline, with weekly focus' },
    { t: 'Evidence strategy',             d: 'How to deploy what you have + what to prioritise building' },
    { t: 'Effort / impact prioritisation', d: 'Every recommended action ranked by cost and contribution' },
    { t: 'Letter strategy + referee plan', d: 'Down to letter structure and referee profile' },
    { t: '1 free update within 14 days',  d: 'Submit context, the affected parts regenerate' },
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
          fontFamily: theme.serif, fontWeight: 400, fontSize: 64, letterSpacing: '-0.022em',
          margin: '0 0 16px', lineHeight: 1.05, maxWidth: 980, textWrap: 'balance', color: theme.ink,
        }}>
          {t('title')[0]}
          <em style={{ fontStyle: 'italic', color: A }}>{t('title')[1]}</em>
          {t('title')[2]}
        </h1>
        <p style={{ color: theme.inkMuted, fontSize: 16, maxWidth: 740, margin: 0, lineHeight: 1.55, textWrap: 'pretty' }}>
          {t('body')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `1px solid ${theme.hairlineFaint}` }}>
        <div style={{ padding: '40px 56px 56px', borderRight: `1px solid ${theme.hairlineFaint}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="#9DC9A8" strokeWidth="1.4"/><path d="M3.6 7 L6.2 9.4 L10.4 4.8" stroke="#9DC9A8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.ink }}>{t('prv_h')}</span>
          </div>
          <div style={{ display: 'grid', gap: 0 }}>
            {previewItems.map((it, i) => (
              <div key={i} style={{ padding: '14px 0', borderTop: `1px solid ${theme.hairlineFaint}`, fontSize: 15, color: theme.ink, letterSpacing: '-0.005em' }}>
                {it}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '40px 56px 56px', background: theme.surface }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="6.5" width="8" height="6" rx="1" fill="none" stroke={A} strokeWidth="1.3"/><path d="M5 6.5 V4.6 a2 2 0 0 1 4 0 V6.5" fill="none" stroke={A} strokeWidth="1.3"/></svg>
            <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.ink }}>{t('ful_h')}</span>
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            {fullItems.map((it, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 16, color: theme.ink, letterSpacing: '-0.012em', marginBottom: 4 }}>{it.t}</div>
                <div style={{ fontSize: 13.5, color: theme.inkMuted, lineHeight: 1.5 }}>{it.d}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, padding: 16, border: `1px dashed ${theme.hairline}`, borderRadius: 6 }}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>{t('guarantee')}</p>
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn variant="primary" theme={theme} onClick={() => {}}>{t('cta')}</Btn>
            <Btn theme={theme} onClick={() => go('unlock')}>{t('back')}</Btn>
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.PreviewScreen = PreviewScreen;

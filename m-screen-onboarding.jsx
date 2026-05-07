/* global React, Bullet, useNav, useLang, useAnswers, FIELDS, MFrame, MTopBar, MBtn, MEyebrow, MHeader, PALETTE */
// Mobile onboarding — pick sub-route(s). Wired to the production FIELDS list
// and the answers.fields multi-select (max 3, same as desktop).

const M_ONB_T = {
  step:        { en: 'Step 1 of 2', zh: '第 1 步 共 2 步' },
  eyebrow:     { en: 'Pick your sub-route', zh: '选择 sub-route' },
  title: {
    en: ['Which ACE ', 'sub-route', ' fits your work best?'],
    zh: ['你的工作最贴近哪个 ', 'ACE sub-route', '？'],
  },
  sub: {
    en: 'Pick the one or two closest to your practice. We use this to scope the Candidacy Scan to current ACE criteria for your discipline — not adjacent routes or archived guidance.',
    zh: '选择最接近你实践的一到两个。我们用它把 Candidacy 体检对齐到你领域当前的 ACE 标准——不混入相邻路径或过时指引。',
  },
  cont:        { en: 'Continue',  zh: '继续' },
  back:        { en: 'Back',      zh: '返回' },
  endorser:    { en: 'Endorsed by Arts Council England', zh: '认定方：Arts Council England' },
  out_eyebrow: { en: 'Not in scope at launch', zh: '首发未覆盖' },
  out_body: {
    en: 'Digital Technology (Tech Nation) and Academia & Research (UKRI) are planned, but not yet covered by the Candidacy reference base. We’ll only ship what we can maintain honestly.',
    zh: 'Digital Technology（Tech Nation）与 Academia & Research（UKRI）在规划中，目前未纳入 Candidacy 参考库。我们只发布我们能诚实维护的内容。',
  },
  empty_help:  { en: 'Pick at least one to continue.', zh: '请至少选择一项以继续。' },
};

// Hint copy + accent colour per production field id.
const FIELD_META = {
  visual_art: {
    hint:  { en: 'Painting, sculpture, photography, mixed media',     zh: '绘画、雕塑、摄影、综合媒介' },
    color: '#9BD3CE', // teal
  },
  design: {
    hint:  { en: 'Industrial, graphic, digital · opens 1 Jul 2026 (HC 1691)', zh: '工业、平面、数字 · 2026 年 7 月 1 日起 (HC 1691)' },
    color: '#A8DDB4', // mint
    badge: { en: 'New · Jul 2026', zh: '新增 · 2026年7月' },
  },
  fashion: {
    hint:  { en: 'Designers, fashion houses, independent labels',      zh: '设计师、时装屋、独立品牌' },
    color: '#B68994', // mauve
  },
  film_tv: {
    hint:  { en: 'Direction, screenwriting, cinematography, editing',  zh: '导演、编剧、摄影、剪辑' },
    color: '#E5B487', // tan
  },
  architecture: {
    hint:  { en: 'Practising architects, built work, exhibition',      zh: '执业建筑师、建成作品、展览' },
    color: '#F3D24A', // yellow
  },
  performing_arts: {
    hint:  { en: 'Theatre, dance, live performance',                   zh: '戏剧、舞蹈、现场表演' },
    color: '#B4A9E7', // violet
  },
  other_arts_culture: {
    hint:  { en: 'Adjacent Arts & Culture practice not listed above',  zh: '上述未列出的 Arts & Culture 相关实践' },
    color: '#D99DCF', // pink
  },
};

function MOnboardingScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const { answers, toggleMulti } = useAnswers();
  const t = (k) => { const v = M_ONB_T[k]; return v ? (v[lang] || v.en) : k; };

  const selectedFields = Array.isArray(answers.fields) ? answers.fields : [];
  const canContinue = selectedFields.length > 0;

  return (
    <MFrame theme={theme}>
      <MTopBar theme={theme} showBack onBack={() => go('landing')} title={t('step')} />

      {/* Progress 1/2 */}
      <div style={{ padding: '0 18px', marginTop: 12 }}>
        <div style={{ height: 3, background: theme.hairlineFaint, borderRadius: 999 }}>
          <div style={{ width: '50%', height: '100%', background: A, borderRadius: 999 }} />
        </div>
      </div>

      <div style={{ padding: '20px 18px 28px' }}>
        <MEyebrow theme={theme} color={A}>{t('eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={26}>
          {t('title')[0]}
          <em style={{ fontStyle: 'italic', color: A, fontWeight: 400 }}>{t('title')[1]}</em>
          {t('title')[2]}
        </MHeader>
        <p style={{ margin: '14px 0 4px', fontSize: 13.5, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
          {t('sub')}
        </p>
        <p style={{ margin: '4px 0 16px', fontSize: 11, color: theme.inkMuted, fontStyle: 'italic' }}>
          {t('endorser')}
        </p>

        <div style={{ display: 'grid', gap: 10 }}>
          {FIELDS.map(f => {
            const isSel = selectedFields.includes(f.id);
            const meta = FIELD_META[f.id] || { hint: { en: '', zh: '' }, color: '#DCDCDE' };
            const label = f.labels[lang] || f.labels.en;
            const hint = meta.hint[lang] || meta.hint.en;
            return (
              <button key={f.id} onClick={() => toggleMulti('fields', f.id, 3)} style={{
                appearance: 'none', textAlign: 'left', cursor: 'pointer',
                border: `1.5px solid ${isSel ? A : theme.hairlineFaint}`,
                borderRadius: 14, background: isSel ? A + '08' : theme.bg,
                padding: '14px 14px 14px 16px',
                display: 'grid', gridTemplateColumns: '20px 1fr 18px', gap: 12, alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Bullet color={meta.color} size={11} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 14.5, color: theme.ink, letterSpacing: '-0.01em' }}>
                      {label}
                    </span>
                    {meta.badge && (
                      <span style={{
                        fontFamily: 'Geist', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.04em',
                        background: PALETTE.mint + '40', color: theme.ink,
                        padding: '2px 6px', borderRadius: 999,
                      }}>{meta.badge[lang] || meta.badge.en}</span>
                    )}
                  </div>
                  {hint && (
                    <div style={{ fontSize: 12, color: theme.inkMuted, lineHeight: 1.4 }}>
                      {hint}
                    </div>
                  )}
                </div>
                <div style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: `1.5px solid ${isSel ? A : theme.hairline}`,
                  background: isSel ? A : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSel && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4 L4 7 L9 1" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{
          marginTop: 18, padding: 14, borderRadius: 12,
          background: theme.surface || theme.hairlineFaint + '40',
          border: `1px dashed ${theme.hairline}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Bullet color={PALETTE.tan} size={7} />
            <span style={{ fontFamily: 'Geist', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.inkMuted }}>
              {t('out_eyebrow')}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: theme.inkMuted, textWrap: 'pretty' }}>{t('out_body')}</p>
        </div>

        {!canContinue && (
          <p style={{ margin: '14px 0 0', fontSize: 12, color: theme.inkMuted, fontStyle: 'italic' }}>
            {t('empty_help')}
          </p>
        )}

        <div style={{ marginTop: 22 }}>
          <MBtn theme={theme} variant="primary" fullWidth onClick={() => canContinue && go('quiz')} style={{
            opacity: canContinue ? 1 : 0.45, pointerEvents: canContinue ? 'auto' : 'none',
          }}>{t('cont')} →</MBtn>
        </div>
      </div>
    </MFrame>
  );
}

window.MOnboardingScreen = MOnboardingScreen;

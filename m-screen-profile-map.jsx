/* global React, useNav, useLang, useAnswers, QUESTIONS, MFrame, MTopBar, MFooter, MBtn, MEyebrow, MHeader, PALETTE */
// Mobile profile map — vertical "spine" diagram of the 8 dimensions
// Candidacy reads against the published criteria. Trunk down the centre,
// each branch peels off as a quarter-arc elbow + horizontal hairline,
// alternating left/right. Architectural shape: bend, run, dot.
//
// Adapted from the spine variant of the design handoff — the other three
// layout variants (radial / bouquet / arc) were design exploration that
// the user explicitly retired.

const M_PROF_T = {
  topbar:  { en: 'Your Candidacy profile', zh: '你的 Candidacy profile' },
  eyebrow: { en: 'Mapped across 8 dimensions', zh: '在 8 个维度上展开' },
  title:   { en: ['One profile, ', 'eight dimensions', '.'], zh: ['一个 profile，', '八个维度', '。'] },
  body: {
    en: 'Each dimension is read against ACE’s published criteria. The free Scan returns a partial reading; the planned paid Preview returns the full mapping.',
    zh: '每个维度都对照 ACE 公开标准解读。免费 Scan 给出局部读图；计划中的付费 Preview 会给出完整映射。',
  },
  cta:  { en: 'See what unlock includes', zh: '查看解锁后包含什么' },
  back: { en: 'Back to results', zh: '返回结果' },
  hub_title: { en: 'Your Candidacy', zh: '你的 Candidacy' },
  hub_sub:   { en: '8 dimensions',   zh: '8 个维度' },
};

// Sub-texts are kept short enough to fit on a single line at width 127 px /
// font-size 10. No wrap means the label never reaches into the same-row arc.
const DIMS = [
  { en: ['Evidence categories',  'Shows · awards · press'], zh: ['证据类别',  '展览 · 出版 · 奖项'],         color: PALETTE.lilac  },
  { en: ['Recommenders',         'Three verifiable letters'], zh: ['推荐人',  '三封可核验推荐信'],            color: PALETTE.yellow },
  { en: ['Opportunity types',    'Residencies · shows'], zh: ['机会类型',  '驻地 · 放映 · 展览'],             color: PALETTE.mint   },
  { en: ['Timing & windows',     'Evidence recency'], zh: ['时机与窗口','证据时效对齐'],                      color: PALETTE.pink   },
  { en: ['Excluded',             'Pay-to-publish or -exhibit'], zh: ['不计入', '付费发表 · 付费展览'],        color: '#A66068'      },
  { en: ['Narrative & sequence', 'Why now · why UK'], zh: ['叙事与时序','为何此时 · 为何英国'],               color: PALETTE.violet },
  { en: ['Endorsing bodies',     'Arts Council England'], zh: ['Endorsing body', 'Arts Council England'],    color: PALETTE.teal   },
  { en: ['ACE criteria',         'Home Office / ACE'], zh: ['ACE 标准',  'Home Office · ACE 指引'],          color: PALETTE.tan    },
];

function VariantSpine({ theme, lang }) {
  const A = theme.brand;
  const W = 339;
  const ROW = 72;
  const items = DIMS;
  const hubX = W / 2;
  const hubY = 16;
  const startY = hubY + 56;
  const H = startY + (items.length - 1) * ROW + 32;
  const trunkBottom = startY + (items.length - 1) * ROW + 8;
  const ARC = 22;          // quarter-arc radius — tidy elbow
  const dotInset = 26;     // dot distance from frame edge
  const labelInset = 36;   // label distance from frame edge

  return (
    <div style={{ position: 'relative', width: W, height: H, margin: '0 auto' }}>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Trunk */}
        <line x1={hubX} y1={hubY + 6} x2={hubX} y2={trunkBottom} stroke={theme.hairline} strokeWidth="0.9" />
        <circle cx={hubX} cy={trunkBottom} r="1.8" fill={theme.hairline} />

        {/* Branches — 45° diagonal elbow + horizontal run.
            Architectural shape: vertical, 45° break, horizontal. Never overlaps. */}
        {items.map((d, i) => {
          const y = startY + i * ROW;
          const isLeft = i % 2 === 0;
          const elbowX = isLeft ? hubX - ARC : hubX + ARC;
          const dotX = isLeft ? dotInset : W - dotInset;
          return (
            <path key={i}
              d={`M ${hubX} ${y - ARC} L ${elbowX} ${y} L ${dotX} ${y}`}
              stroke={theme.hairline} strokeWidth="0.9" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
          );
        })}
      </svg>

      {/* Hub */}
      <div style={{
        position: 'absolute', left: hubX, top: hubY, transform: 'translate(-50%, -50%)',
        width: 12, height: 12, borderRadius: '50%', background: A,
        boxShadow: `0 0 0 5px ${A}1a`,
      }} />

      {items.map((d, i) => {
        const labels = lang === 'zh' ? d.zh : d.en;
        const y = startY + i * ROW;
        const isLeft = i % 2 === 0;
        return (
          <React.Fragment key={i}>
            <div style={{
              position: 'absolute', left: isLeft ? dotInset : W - dotInset, top: y,
              transform: 'translate(-50%, -50%)',
              width: 8, height: 8, borderRadius: '50%', background: d.color,
              boxShadow: `0 0 0 3px ${d.color}1f`,
            }} />
            <div style={{
              position: 'absolute',
              // Label sits clearly above the line so the same-row hairline
              // and quarter-arc remain fully visible beneath. Bigger gap
              // here also gives the rare 2-line wrap room to breathe.
              [isLeft ? 'left' : 'right']: labelInset,
              top: y - 12,
              transform: 'translateY(-100%)',
              textAlign: isLeft ? 'left' : 'right',
              width: W / 2 - labelInset - 6,
            }}>
              <div style={{
                fontFamily: 'Geist', fontWeight: 600, fontSize: 12.5,
                color: theme.ink, letterSpacing: '-0.012em', lineHeight: 1.2,
              }}>{labels[0]}</div>
              <div style={{
                fontSize: 10, color: theme.inkMuted, marginTop: 3,
                lineHeight: 1.35, letterSpacing: '-0.003em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{labels[1]}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function MProfileMapScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const { step } = useAnswers();
  const t = (k) => { const v = M_PROF_T[k]; return v ? (v[lang] || v.en) : k; };
  // Results-screen exit only makes sense once the Scan has been run far enough
  // to land on it. Otherwise the route would dump the user on a results screen
  // with no data behind it.
  const hasResults = step >= (QUESTIONS?.length || 0) - 1 && step > 0;

  return (
    <MFrame theme={theme}>
      <MTopBar theme={theme} showBack onBack={() => go('landing')} title={t('topbar')} />

      <div style={{ padding: '20px 18px 12px' }}>
        <MEyebrow theme={theme} color={A}>{t('eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={24}>
          {t('title')[0]}
          <em style={{ fontStyle: 'italic', color: A, fontWeight: 400 }}>{t('title')[1]}</em>
          {t('title')[2]}
        </MHeader>
      </div>

      <VariantSpine theme={theme} lang={lang} />

      <div style={{ padding: '16px 18px 20px' }}>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
          {t('body')}
        </p>
      </div>
      <div style={{ padding: '4px 18px 32px', display: 'grid', gap: 8 }}>
        <MBtn theme={theme} variant="ghost" fullWidth onClick={() => go('unlock')}>{t('cta')} →</MBtn>
        {hasResults && (
          <MBtn theme={theme} variant="ghost" fullWidth onClick={() => go('results')}>{t('back')}</MBtn>
        )}
      </div>

      <MFooter theme={theme} />
    </MFrame>
  );
}

window.MProfileMapScreen = MProfileMapScreen;

/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, useNav */

function AnalyzeScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="analyze" />

      <div style={{ padding: '56px 56px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Bullet color={A.yellow} size={10} />
          <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.03em', textTransform: 'uppercase', color: theme.inkMuted }}>
            {t('Opportunity analyser', '机会分析器')}
          </span>
        </div>
        <h1 style={{
          fontFamily: theme.serif, fontWeight: 400, fontSize: 52, letterSpacing: '-0.022em',
          margin: '0 0 12px', lineHeight: 1.05, maxWidth: 900, textWrap: 'balance', color: theme.ink,
        }}>
          {t('Is this open call, award, publication or residency worth your time?', '这个 open call、奖项、出版或驻地，值得你投入时间吗？')}
        </h1>
        <p style={{ color: theme.inkMuted, fontSize: 16, maxWidth: 680, margin: 0, lineHeight: 1.55 }}>
          {t(
            'Paste the details. We return a fit judgement scoped to your route — strategic value, plausibility, timing, and whether it converts into useful evidence.',
            '粘贴机会详情。我们会针对你所在的路径，输出契合度判断——战略价值、可行性、时机，以及它能否转化为有用的证据。'
          )}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', borderTop: `1px solid ${theme.hairlineFaint}`, minHeight: 720 }}>
        {/* INPUT */}
        <div style={{ padding: '44px 56px', borderRight: `1px solid ${theme.hairlineFaint}` }}>
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 20 }}>{t('Input', '输入')}</div>
          <div style={{ display: 'grid', gap: 18 }}>
            {[
              { label: t('Route', '路径'),                       value: t('Visual Art', '视觉艺术'),                                              color: A.pink },
              { label: t('Title', '标题'),                       value: t('Fieldwork Issue 2 — Open Submission', 'Fieldwork Issue 2 — 公开征稿'),  color: A.yellow },
              { label: t('Deadline', '截止时间'),                 value: t('6 May 2026', '2026 年 5 月 6 日') },
              { label: t('Fee', '费用'),                         value: t('~ £19', '约 £19') },
              { label: t('Your project', '你的项目'),             value: t('TWICE (photo series, 2024–26)', 'TWICE（摄影系列，2024–26）') },
              { label: t('Target submission', '目标递交时间'),     value: t('Oct 2026', '2026 年 10 月') },
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${theme.hairlineFaint}`, paddingBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  {f.color && <Bullet color={f.color} size={9} />}
                  <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted }}>{f.label}</span>
                </div>
                <div style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: theme.ink, letterSpacing: '-0.01em' }}>{f.value}</div>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 8 }}>{t('Description', '简介')}</div>
              <div style={{
                padding: '14px 16px', border: `1px solid ${theme.hairlineFaint}`, borderRadius: 10,
                background: theme.surface, fontSize: 13.5, lineHeight: 1.6, color: theme.inkMuted, minHeight: 110,
              }}>
                {t(
                  'Biannual print publication focused on contemporary image-based practice. Selected works printed and distributed through independent bookshops in UK, Germany, Japan. Editorial selection; no curatorial theme stated. Previous issues featured artists represented by mid-sized galleries.',
                  '半年刊的纸本出版物，关注当代图像类创作实践。入选作品以印刷形式出版，并通过英国、德国、日本的独立书店发行。编辑筛选制；未设定具体策展主题。过往刊号刊登过中等规模画廊代理的艺术家作品。'
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
            <Btn variant="primary" theme={theme}>{t('Run analysis', '开始分析')}</Btn>
            <Btn theme={theme}>{t('Clear', '清空')}</Btn>
          </div>
        </div>

        {/* OUTPUT — mind map */}
        <div style={{ padding: '44px 56px', background: theme.surface }}>
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 14 }}>{t('Judgement', '判断')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
            <Bullet color={A.mint} size={18} />
            <span style={{ fontFamily: 'Geist', fontSize: 30, fontWeight: 600, letterSpacing: '-0.025em', color: theme.ink, lineHeight: 1.05 }}>
              {t('Strong fit — worth shortlisting.', '契合度高——值得加入候选。')}
            </span>
          </div>

          {/* Analysis mind-map */}
          <MindMap width={640} height={340} theme={theme}>
            <svg width={640} height={340} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {[
                { x: 140, y: 50 }, { x: 140, y: 170 }, { x: 140, y: 290 },
                { x: 540, y: 50 }, { x: 540, y: 170 }, { x: 540, y: 290 },
              ].map((p, i) => (
                <MMLine key={i} x1={320} y1={170} x2={p.x + (p.x < 320 ? 90 : -8)} y2={p.y} color={theme.connector} />
              ))}
            </svg>

            <div style={{
              position: 'absolute', left: 320, top: 170,
              transform: 'translate(-50%, -50%)',
              padding: '10px 18px', background: theme.bg,
              border: `2px solid ${theme.brand}`, borderRadius: 999,
              fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: theme.ink,
            }}>
              Fieldwork Issue 2
            </div>

            {[
              { x: 10,  y: 50,  anchor: 'start', color: A.mint,   label: t('Route alignment', '路径契合'),  sub: t('Visual art · image-led', '视觉艺术 · 图像主导') },
              { x: 10,  y: 170, anchor: 'start', color: A.mint,   label: t('Plausibility', '可行性'),       sub: t('TWICE is a credible fit', 'TWICE 契合度可信') },
              { x: 10,  y: 290, anchor: 'start', color: A.mint,   label: t('Evidence value', '证据价值'),    sub: t('+ publication evidence', '+ 出版证据') },
              { x: 630, y: 50,  anchor: 'end',   color: A.yellow, label: t('Timing', '时机'),               sub: t('5 months to target', '距目标递交还有 5 个月') },
              { x: 630, y: 170, anchor: 'end',   color: A.yellow, label: t('External weight', '外部分量'),   sub: t('Independent press', '独立出版社') },
              { x: 630, y: 290, anchor: 'end',   color: A.tan,    label: t('Cost', '成本'),                 sub: t('£19 · low risk', '£19 · 风险较低') },
            ].map((n, i) => <MMNode key={i} theme={theme} {...n} />)}
          </MindMap>

          <Rule theme={theme} style={{ margin: '24px 0' }} />

          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { c: A.mint,   k: t('Why it matters', '为何重要'),   v: t('Converts into publication evidence — one of your current gap categories.', '能转化为出版类证据——这是你当前缺口类别之一。') },
              { c: A.yellow, k: t('Where it is weak', '弱点在哪'), v: t('Editorial selection from an independent press. Useful but not institutional weight.', '独立出版社的编辑筛选制。有用，但不具备机构层级的分量。') },
              { c: A.sky,    k: t('Recommendation', '建议'),       v: t('Shortlist and submit. Do not let this replace an institutional or ACE-tier opportunity in parallel.', '加入候选并提交。不要让它取代同期可以追的机构级或 ACE 层级机会。') },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 14 }}>
                <Bullet color={row.c} size={11} style={{ marginTop: 5 }} />
                <div>
                  <div style={{ fontFamily: 'Geist', fontSize: 14.5, fontWeight: 600, color: theme.ink, marginBottom: 3, letterSpacing: '-0.005em' }}>{row.k}</div>
                  <div style={{ fontSize: 13.5, color: theme.inkMuted, lineHeight: 1.55 }}>{row.v}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
            <Btn variant="primary" theme={theme} onClick={() => go('discover')}>{t('Save to shortlist', '加入候选')}</Btn>
            <Btn theme={theme} onClick={() => go('discover')}>{t('Compare alternatives', '比较其他选项')}</Btn>
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.AnalyzeScreen = AnalyzeScreen;

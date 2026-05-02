/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, Status, useNav */

function EvidenceScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();

  const filters = [
    { c: A.pink,   label: t('All', '全部'),                count: 14, active: true },
    { c: A.tan,    label: t('Exhibitions', '展览'),        count: 5 },
    { c: A.teal,   label: t('Screenings', '放映'),         count: 2 },
    { c: A.mint,   label: t('Reviews', '评论'),            count: 3 },
    { c: A.yellow, label: t('Awards', '奖项'),             count: 1 },
    { c: A.violet, label: t('Publications', '出版'),       count: 2 },
    { c: A.lilac,  label: t('Residencies', '驻地'),        count: 1 },
  ];

  const items = [
    { c: A.tan,    type: t('Exhibition', '展览'),    title: t('TWICE — solo show', 'TWICE — 个展'),                       host: t('Cell Project Space, London', 'Cell Project Space，伦敦'), date: t('Mar 2025', '2025 年 3 月'), recency: 'recent', status: 'solid',   weight: 'mid' },
    { c: A.tan,    type: t('Exhibition', '展览'),    title: t('Distant Witness — group', 'Distant Witness — 群展'),         host: t('Whitechapel · Open', 'Whitechapel · 公开展'),               date: t('Sep 2024', '2024 年 9 月'), recency: 'recent', status: 'solid',   weight: 'high' },
    { c: A.mint,   type: t('Review', '评论'),         title: t('Tate Online — feature review', 'Tate Online — 专题评论'),     host: 'Tate Etc.',                                                date: t('Nov 2024', '2024 年 11 月'), recency: 'recent', status: 'solid',   weight: 'high' },
    { c: A.teal,   type: t('Screening', '放映'),      title: t('Late Programme — short selection', 'Late Programme — 短片单元'), host: 'BFI Southbank',                                          date: t('Feb 2025', '2025 年 2 月'), recency: 'recent', status: 'solid',   weight: 'mid' },
    { c: A.violet, type: t('Publication', '出版'),    title: 'Image-Forum Annual',                                          host: 'Image-Forum Press',                                        date: t('Jul 2024', '2024 年 7 月'), recency: 'recent', status: 'solid',   weight: 'mid' },
    { c: A.tan,    type: t('Exhibition', '展览'),     title: t('Fieldnotes — group', 'Fieldnotes — 群展'),                  host: 'Hauser Projects',                                          date: t('May 2023', '2023 年 5 月'), recency: 'aging',  status: 'partial', weight: 'mid' },
    { c: A.mint,   type: t('Review', '评论'),         title: t('Frieze short review', 'Frieze 短评'),                       host: 'Frieze',                                                   date: t('Apr 2023', '2023 年 4 月'), recency: 'aging',  status: 'partial', weight: 'high' },
    { c: A.yellow, type: t('Award', '奖项'),          title: t('Jerwood Photography — shortlist', 'Jerwood Photography — 入围'), host: 'Jerwood Foundation',                                    date: t('Jun 2022', '2022 年 6 月'), recency: 'old',    status: 'partial', weight: 'high' },
    { c: A.tan,    type: t('Exhibition', '展览'),     title: t('Studio Open House', '工作室开放日'),                          host: t('Hackney Wick · self-organised', 'Hackney Wick · 自组织'),  date: t('Sep 2024', '2024 年 9 月'), recency: 'recent', status: 'gap',     weight: 'low' },
    { c: A.violet, type: t('Publication', '出版'),    title: t('Open-Press Annual (excluded)', 'Open-Press Annual（不计入）'), host: t('Pay-to-publish · excluded', '付费发表 · 不计入'),         date: t('Aug 2023', '2023 年 8 月'), recency: 'aging',  status: 'excluded',weight: '—' },
  ];

  const recencyDot = (r) => r === 'recent' ? A.mint : r === 'aging' ? A.yellow : A.mauve;
  const recencyLabel = (r) => r === 'recent' ? t('< 24 mo', '< 24 个月') : r === 'aging' ? t('24–36 mo', '24–36 个月') : t('> 36 mo', '> 36 个月');
  const weightDot = (w) => w === 'high' ? A.mint : w === 'mid' ? A.sky : w === 'low' ? A.tan : A.grey;

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="evidence" />

      <div style={{ padding: '48px 56px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Bullet color={A.tan} size={11} />
              <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.03em', color: theme.inkMuted, textTransform: 'uppercase' }}>
                {t('Evidence library', '证据库')}
              </span>
            </div>
            <h1 style={{
              fontFamily: theme.serif, fontWeight: 400, fontSize: 48, letterSpacing: '-0.022em',
              margin: '0 0 8px', lineHeight: 1.04, color: theme.ink, maxWidth: 800, textWrap: 'balance',
            }}>
              {t('Everything documentable about your practice, classified.', '关于你实践的一切可记录内容，已分类。')}
            </h1>
            <p style={{ color: theme.inkMuted, fontSize: 15.5, margin: 0, lineHeight: 1.55, maxWidth: 640 }}>
              {t(
                <><strong style={{ color: theme.ink, fontWeight: 600 }}>14 items</strong> across exhibitions, screenings, reviews, publications, awards. Each tagged for recency, status and external weight.</>,
                <><strong style={{ color: theme.ink, fontWeight: 600 }}>14 项</strong>，涵盖展览、放映、评论、出版与奖项。每项都标注了时效性、状态与外部分量。</>
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn theme={theme}>{t('Import from CV', '从简历导入')}</Btn>
            <Btn variant="primary" theme={theme}>{t('+ Add evidence', '+ 添加证据')}</Btn>
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div style={{ padding: '0 56px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { c: A.mint,   k: t('Solid', '稳健'),                            v: '8',     sub: t('Documented & verifiable', '已记录且可核实') },
            { c: A.yellow, k: t('Partial', '部分'),                          v: '3',     sub: t('Documentation incomplete', '记录不完整') },
            { c: A.mauve,  k: t('Gap', '缺口'),                              v: '1',     sub: t('Self-organised, low weight', '自组织，分量较低') },
            { c: A.charcoal, k: t('Recency · last 24 mo', '时效性 · 近 24 个月'), v: '6 / 14', sub: t('Target: at least 50% recent', '目标：至少 50% 为近期') },
          ].map((s, i) => (
            <div key={i} style={{
              border: `1px solid ${theme.hairlineFaint}`, borderRadius: 14, padding: '18px 20px', background: theme.bg,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Bullet color={s.c} size={10} />
                <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted }}>{s.k}</span>
              </div>
              <div style={{ fontFamily: theme.serif, fontSize: 38, fontWeight: 400, letterSpacing: '-0.018em', color: theme.ink, lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
              <div style={{ fontSize: 12.5, color: theme.inkMuted }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        padding: '14px 56px',
        borderTop: `1px solid ${theme.hairlineFaint}`, borderBottom: `1px solid ${theme.hairlineFaint}`,
        background: theme.surface, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      }}>
        {filters.map((f, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 12px', borderRadius: 999,
            border: `1px solid ${f.active ? theme.ink : theme.hairlineFaint}`,
            background: f.active ? theme.ink : theme.bg,
            color: f.active ? theme.bg : theme.ink,
            fontFamily: 'Geist', fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
          }}>
            <Bullet color={f.c} size={8} />
            {f.label}
            <span style={{ opacity: 0.6, marginLeft: 2 }}>{f.count}</span>
          </span>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: 'Geist', fontSize: 12.5, color: theme.inkMuted }}>
          {t(<>Sort by <strong style={{ color: theme.ink, fontWeight: 600 }}>recency</strong> ▾</>,
             <>排序：<strong style={{ color: theme.ink, fontWeight: 600 }}>时效性</strong> ▾</>)}
        </span>
      </div>

      {/* Table */}
      <div style={{ padding: '0 56px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '14px 1.6fr 1fr 0.9fr 0.9fr 0.85fr 0.95fr 16px',
          gap: 16, padding: '14px 0', borderBottom: `1px solid ${theme.hairline}`,
          fontFamily: 'Geist', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.inkMuted,
        }}>
          <span></span><span>{t('Title', '标题')}</span><span>{t('Host', '主办')}</span><span>{t('Type', '类型')}</span><span>{t('Date', '日期')}</span><span>{t('Recency', '时效性')}</span><span>{t('Status', '状态')}</span><span></span>
        </div>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '14px 1.6fr 1fr 0.9fr 0.9fr 0.85fr 0.95fr 16px',
            gap: 16, padding: '16px 0', borderBottom: `1px solid ${theme.hairlineFaint}`,
            alignItems: 'center',
            opacity: it.status === 'excluded' ? 0.5 : 1,
          }}>
            <Bullet color={it.c} size={12} />
            <div>
              <div style={{
                fontFamily: 'Geist', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: theme.ink,
                textDecoration: it.status === 'excluded' ? 'line-through' : 'none',
              }}>{it.title}</div>
              <div style={{ fontSize: 12.5, color: theme.inkMuted, marginTop: 1, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Bullet color={weightDot(it.weight)} size={6} />
                {t('weight', '分量')} · {it.weight === 'high' ? t('high', '高') : it.weight === 'mid' ? t('mid', '中') : it.weight === 'low' ? t('low', '低') : it.weight}
              </div>
            </div>
            <span style={{ fontSize: 13.5, color: theme.inkMuted }}>{it.host}</span>
            <span style={{ fontFamily: 'Geist', fontSize: 13.5, fontWeight: 500, color: theme.ink }}>{it.type}</span>
            <span style={{ fontSize: 13.5, color: theme.ink }}>{it.date}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: theme.ink, fontFamily: 'Geist' }}>
              <Bullet color={recencyDot(it.recency)} size={9} /> {recencyLabel(it.recency)}
            </span>
            <Status kind={it.status} theme={theme} />
            <span style={{ color: theme.inkFaint, fontSize: 16, textAlign: 'right' }}>→</span>
          </div>
        ))}
      </div>

      {/* Gap suggestion */}
      <div style={{ padding: '36px 56px 60px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '14px 1fr auto', gap: 16, alignItems: 'center',
          padding: '20px 24px', borderRadius: 14,
          border: `1px solid ${theme.hairlineFaint}`,
          background: 'rgba(59,144,242,0.05)',
        }}>
          <Bullet color={theme.brand} size={12} />
          <div>
            <div style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em', color: theme.ink, marginBottom: 3 }}>
              {t('Your evidence is strongest in exhibitions and reviews — weakest in awards and residencies.', '你的证据在展览与评论方向最强——奖项与驻地方向最弱。')}
            </div>
            <div style={{ fontSize: 13.5, color: theme.inkMuted, lineHeight: 1.5 }}>
              {t('We’ve surfaced 5 opportunities that would close the recency and external-weight gaps. None are pay-to-anything.', '我们筛选出 5 个机会，可以补齐时效性与外部分量的缺口。没有任何一个属于「付费才参与」的类型。')}
            </div>
          </div>
          <Btn variant="primary" theme={theme} onClick={() => go('discover')}>{t('See suggestions →', '查看建议 →')}</Btn>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.EvidenceScreen = EvidenceScreen;

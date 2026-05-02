/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, useNav */

function DiscoverScreen({ theme }) {
  const A = theme.accent;
  const t = useT();

  const opportunities = [
    { name: 'Fieldwork Issue 2',                                  type: t('Publication', '出版'),    deadline: t('6 May 2026', '2026 年 5 月 6 日'),   fee: t('~£19', '约 £19'),   fit: 'strong',  c: A.pink,   route: t('Visual art', '视觉艺术'),       note: t('Editorial selection · image-led', '编辑筛选 · 图像主导') },
    { name: 'ZRFDBCK Drift',                                      type: t('Exhibition', '展览'),     deadline: t('20 May 2026', '2026 年 5 月 20 日'), fee: t('~£19', '约 £19'),   fit: 'strong',  c: A.yellow, route: t('Visual art', '视觉艺术'),       note: t('Fast-cycle · international touring', '周期短 · 国际巡展') },
    { name: 'Screening Weekender',                                type: t('Screening', '放映'),      deadline: t('30 May 2026', '2026 年 5 月 30 日'), fee: t('~£22', '约 £22'),   fit: 'strong',  c: A.teal,   route: t('Film & TV', '影视'),            note: t('Curated festival selection', '策展型电影节单元') },
    { name: 'Design Open Lab',                                    type: t('Institutional', '机构'),   deadline: t('18 May 2026', '2026 年 5 月 18 日'), fee: t('Free', '免费'),     fit: 'partial', c: A.tan,    route: t('Design', '设计'),               note: t('Low external visibility', '外部曝光度较低') },
    { name: 'Fashion Image Feature',                              type: t('Publication', '出版'),    deadline: t('12 May 2026', '2026 年 5 月 12 日'), fee: t('~£15', '约 £15'),   fit: 'partial', c: A.lilac,  route: t('Fashion', '时尚'),              note: t('Depends on tier', '取决于刊号层级') },
    { name: t('Performing Arts Residency', '表演艺术驻地'),         type: t('Residency', '驻地'),      deadline: t('10 Jun 2026', '2026 年 6 月 10 日'), fee: t('~£25', '约 £25'),   fit: 'strong',  c: A.violet, route: t('Performing arts', '表演艺术'),  note: t('Public outcome · institutional host', '有公开成果 · 机构主办') },
    { name: t('Vanity Print Prize', '付费印刷奖（vanity）'),         type: t('Award', '奖项'),          deadline: t('4 Jun 2026', '2026 年 6 月 4 日'),   fee: t('~£180', '约 £180'),  fit: 'excluded',c: A.mauve,  route: '—',                              note: t('Pay-to-publish · excluded', '付费发表 · 不计入') },
  ];

  const fitLabel = f => f === 'strong' ? t('Strong fit', '契合度高') : f === 'partial' ? t('Possible', '可考虑') : t('Excluded', '不计入');
  const fitColor = f => f === 'strong' ? A.mint : f === 'partial' ? A.yellow : A.mauve;

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="discover" />

      <div style={{ padding: '56px 56px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Bullet color={A.mint} size={10} />
          <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.03em', textTransform: 'uppercase', color: theme.inkMuted }}>
            {t('Discover opportunities', '发现机会')}
          </span>
        </div>
        <h1 style={{
          fontFamily: theme.serif, fontWeight: 400, fontSize: 52, letterSpacing: '-0.022em',
          margin: '0 0 12px', lineHeight: 1.05, maxWidth: 940, textWrap: 'balance', color: theme.ink,
        }}>
          {t('Opportunities scoped to your route, project, timing and budget.', '根据你的路径、项目、时间与预算筛选出的机会。')}
        </h1>
        <p style={{ color: theme.inkMuted, fontSize: 16, maxWidth: 720, margin: 0, lineHeight: 1.55 }}>
          {t(
            'Pay-to-publish journals and pay-to-exhibit galleries filtered out by default. What’s left is ranked by fit with your current evidence gaps.',
            '默认过滤掉付费发表期刊与付费展览画廊。剩下的按与你当前证据缺口的契合度排序。'
          )}
        </p>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        padding: '18px 56px', borderTop: `1px solid ${theme.hairlineFaint}`, borderBottom: `1px solid ${theme.hairlineFaint}`,
        background: theme.surface,
      }}>
        <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginRight: 4 }}>{t('Filters', '筛选')}</span>
        <Chip theme={theme} color={A.pink}>{t('Route: Visual art', '路径：视觉艺术')}</Chip>
        <Chip theme={theme} color={A.sky}>{t('Project: TWICE', '项目：TWICE')}</Chip>
        <Chip theme={theme} color={A.yellow}>{t('Target: Oct 2026', '目标：2026 年 10 月')}</Chip>
        <Chip theme={theme} color={A.tan}>{t('Budget ≤ £50', '预算 ≤ £50')}</Chip>
        <Chip theme={theme} color={A.mint}>{t('Needs: Publication · Institutional', '需要：出版 · 机构')}</Chip>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: 'Geist', fontSize: 13, color: theme.inkMuted }}>
          {t(
            <><strong style={{ color: theme.ink, fontWeight: 600 }}>7</strong> results · <strong style={{ color: theme.ink, fontWeight: 600 }}>5</strong> shortlistable</>,
            <><strong style={{ color: theme.ink, fontWeight: 600 }}>7</strong> 项结果 · <strong style={{ color: theme.ink, fontWeight: 600 }}>5</strong> 项可加入候选</>
          )}
        </span>
      </div>

      {/* Table */}
      <div style={{ padding: '0 56px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '18px 2fr 1fr 1.1fr 1fr 0.7fr 1fr 24px',
          gap: 18, padding: '16px 0', borderBottom: `1px solid ${theme.hairlineFaint}`,
          fontFamily: 'Geist', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted,
        }}>
          <span></span><span>{t('Name', '名称')}</span><span>{t('Type', '类型')}</span><span>{t('Route', '路径')}</span><span>{t('Deadline', '截止时间')}</span><span>{t('Fee', '费用')}</span><span>{t('Fit', '契合度')}</span><span></span>
        </div>
        {opportunities.map((o, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '18px 2fr 1fr 1.1fr 1fr 0.7fr 1fr 24px',
            gap: 18, padding: '18px 0', borderBottom: `1px solid ${theme.hairlineFaint}`,
            alignItems: 'center',
            opacity: o.fit === 'excluded' ? 0.5 : 1,
          }}>
            <Bullet color={o.c} size={12} />
            <div>
              <div style={{
                fontFamily: 'Geist', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em',
                textDecoration: o.fit === 'excluded' ? 'line-through' : 'none', color: theme.ink,
              }}>{o.name}</div>
              <div style={{ fontSize: 12.5, color: theme.inkMuted, marginTop: 2 }}>{o.note}</div>
            </div>
            <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13.5, color: theme.ink }}>{o.type}</span>
            <span style={{ fontSize: 13.5, color: theme.inkMuted }}>{o.route}</span>
            <span style={{ fontFamily: 'Geist', fontSize: 13.5, color: theme.ink }}>{o.deadline}</span>
            <span style={{ fontFamily: 'Geist', fontSize: 13.5, color: theme.ink }}>{o.fee}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bullet color={fitColor(o.fit)} size={9} />
              <span style={{ fontFamily: 'Geist', fontSize: 13.5, fontWeight: 500, color: theme.ink, letterSpacing: '-0.005em' }}>{fitLabel(o.fit)}</span>
            </div>
            <span style={{ color: theme.inkFaint, textAlign: 'right', fontSize: 16 }}>→</span>
          </div>
        ))}
      </div>

      {/* Gap coverage — as mini maps */}
      <div style={{ padding: '48px 56px 64px' }}>
        <ColorHeader color={theme.ink} size={28}>{t('How these close your current gaps', '它们如何补上你当前的缺口')}</ColorHeader>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 24 }}>
          {[
            { gap: t('Publication', '出版'),     fills: 2, of: 3, c: A.mint,   note: t('Fieldwork + Fashion Image close this', 'Fieldwork 与 Fashion Image 可以补上') },
            { gap: t('Institutional', '机构'),   fills: 1, of: 3, c: A.yellow, note: t('Only Performing Arts residency applies', '只有表演艺术驻地适用') },
            { gap: t('Recency', '时效性'),        fills: 4, of: 4, c: A.mint,   note: t('All shortlisted options land in window', '所有候选项都落在窗口内') },
          ].map((g, i) => (
            <div key={i} style={{ border: `1px solid ${theme.hairlineFaint}`, borderRadius: 14, padding: 22, background: theme.surface }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Bullet color={g.c} size={12} />
                <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 15, color: theme.ink, letterSpacing: '-0.01em' }}>{g.gap}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: theme.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.025em', color: theme.ink, lineHeight: 1 }}>{g.fills}</span>
                <span style={{ fontSize: 13, color: theme.inkMuted }}>{t(<>of {g.of} closable</>, <>/ {g.of} 可补上</>)}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {Array.from({ length: g.of }).map((_, j) => (
                  <div key={j} style={{ flex: 1, height: 4, background: j < g.fills ? g.c : theme.hairlineFaint, borderRadius: 2 }} />
                ))}
              </div>
              <div style={{ fontSize: 13, color: theme.inkMuted }}>{g.note}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.DiscoverScreen = DiscoverScreen;

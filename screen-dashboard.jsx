/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, Status, useNav */

function DashboardScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();
  const score = 62;

  // Mind-map summary positions
  const mmW = 720, mmH = 320, hubX = mmW / 2, hubY = mmH / 2;
  const axes = [
    { x: 110, y: 80,  c: A.pink,   label: t('Evidence', '证据'),         v: '26/40', dashed: false, anchor: 'start' },
    { x: 110, y: 240, c: A.mint,   label: t('Recommenders', '推荐人'),    v: '14/30', dashed: false, anchor: 'start' },
    { x: 610, y: 80,  c: A.violet, label: t('Readiness', '准备状态'),     v: '22/30', dashed: false, anchor: 'end' },
    { x: 610, y: 240, c: A.yellow, label: t('Opportunities', '机会'),     v: t('5 active', '5 个进行中'), dashed: true, anchor: 'end' },
  ];

  const recentActivity = [
    { c: A.pink,   title: t('Added ZRFDBCK Drift to shortlist', '已将 ZRFDBCK Drift 加入候选'),                when: t('2h ago', '2 小时前'),   meta: t('Discover', '发现') },
    { c: A.yellow, title: t('Analysed Fieldwork Issue 2 — Open Submission', '已分析 Fieldwork Issue 2 — 公开征稿'), when: t('Yesterday', '昨天'),    meta: t('Strong fit', '契合度高') },
    { c: A.mint,   title: t('Recommender 2 confirmed — Dr. R. Andoh', '推荐人 2 已确认 — Dr. R. Andoh'),       when: t('3d ago', '3 天前'),    meta: t('Letter received', '推荐信已收到') },
    { c: A.tan,    title: t('Evidence updated — Tate Online review (2024)', '证据已更新 — Tate Online 评论（2024）'), when: t('1w ago', '1 周前'),     meta: t('Recency improved', '时效性提升') },
  ];

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="dashboard" />

      <div style={{ padding: '48px 56px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{
              fontFamily: theme.serif, fontWeight: 400, fontSize: 48, letterSpacing: '-0.022em',
              margin: '0 0 8px', lineHeight: 1.05, color: theme.ink,
            }}>
              {t('Welcome back, Mira.', '欢迎回来，Mira。')}
            </h1>
            <p style={{ color: theme.inkMuted, fontSize: 16, margin: 0, lineHeight: 1.5 }}>
              {t(
                <>Visual Art · Film & TV · target Oct 2026 · <strong style={{ color: theme.ink, fontWeight: 600 }}> 5 months</strong> until your submission window opens.</>,
                <>视觉艺术 · 影视 · 目标 2026 年 10 月 · 距递交窗口开启还有 <strong style={{ color: theme.ink, fontWeight: 600 }}>5 个月</strong>。</>
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn theme={theme} onClick={() => go('analyze')}>{t('Analyse opportunity', '分析机会')}</Btn>
            <Btn variant="primary" theme={theme} onClick={() => go('discover')}>{t('Find what fits', '找出适合的机会')}</Btn>
          </div>
        </div>
      </div>

      {/* TOP ROW — Score map + sidebar metrics */}
      <div style={{ padding: '0 56px 32px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <div style={{
          border: `1px solid ${theme.hairlineFaint}`, borderRadius: 16, padding: '24px 28px',
          background: theme.bg,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted }}>
              {t('Your readiness map', '你的准备度地图')}
            </div>
            <a onClick={() => go('results')} style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: theme.brand, cursor: 'pointer' }}>
              {t('See full breakdown →', '查看完整分析 →')}
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
            <span style={{ fontFamily: theme.serif, fontSize: 76, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: theme.ink }}>{score}</span>
            <span style={{ fontSize: 14, color: theme.inkMuted }}>{t('/ 100 · building foundation', '/ 100 · 基础建立中')}</span>
            <Chip theme={theme} color={A.mint}>{t('+4 this month', '本月 +4')}</Chip>
          </div>

          <div style={{ position: 'relative', width: '100%', height: mmH, marginTop: 16 }}>
            <svg width="100%" height={mmH} viewBox={`0 0 ${mmW} ${mmH}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {axes.map((a, i) => (
                <MMLine key={i}
                  x1={hubX} y1={hubY}
                  x2={a.x + (a.anchor === 'end' ? -8 : 8)} y2={a.y}
                  color={theme.connector} dashed={a.dashed} />
              ))}
            </svg>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: theme.brand, boxShadow: `0 0 0 10px ${theme.brand}1A`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: 'Geist' }}>{score}</div>
              <div style={{ fontFamily: 'Geist', fontSize: 12, color: theme.inkMuted, textAlign: 'center' }}>{t('Overall', '总分')}</div>
            </div>
            {axes.map((a, i) => (
              <div key={i} style={{
                position: 'absolute', left: `${(a.x / mmW) * 100}%`, top: a.y,
                transform: `translate(${a.anchor === 'end' ? '-100%' : '0'}, -50%)`,
                display: 'flex', alignItems: 'center', gap: 10,
                flexDirection: a.anchor === 'end' ? 'row-reverse' : 'row',
              }}>
                <Bullet color={a.c} size={14} />
                <div style={{ textAlign: a.anchor === 'end' ? 'right' : 'left' }}>
                  <div style={{ fontFamily: 'Geist', fontSize: 14.5, fontWeight: 600, color: theme.ink, letterSpacing: '-0.005em', whiteSpace: 'nowrap' }}>{a.label}</div>
                  <div style={{ fontFamily: 'Geist', fontSize: 12.5, color: theme.inkMuted, whiteSpace: 'nowrap' }}>{a.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — next 3 actions */}
        <div style={{
          border: `1px solid ${theme.hairlineFaint}`, borderRadius: 16, padding: '24px 24px',
          background: theme.bg, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 16 }}>
            {t('Next moves, in order', '下一步，按顺序')}
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            {[
              { c: A.yellow, n: '01', title: t('Refresh evidence recency', '补充证据时效性'),       body: t('2–3 items in the last 24 months', '近 24 个月内 2–3 项'),       cta: t('Open evidence library', '打开证据库'), to: 'evidence' },
              { c: A.mint,   n: '02', title: t('Lock the third recommender', '确定第三位推荐人'),    body: t('You have 2 confirmed of 3', '已确认 2 / 3'),                  cta: t('Open tracker', '打开追踪器'),    to: 'evidence' },
              { c: A.sky,    n: '03', title: t('Map narrative to ACE criteria', '把叙述对应到 ACE 标准'), body: t('Personal statement scaffold', '个人陈述框架'),                cta: t('Start narrative', '开始撰写'),    to: 'evidence' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 12 }}>
                <Bullet color={s.c} size={12} style={{ marginTop: 5 }} />
                <div>
                  <div style={{ fontFamily: 'Geist', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: theme.inkMuted, marginBottom: 2 }}>{s.n}</div>
                  <div style={{ fontFamily: 'Geist', fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em', color: theme.ink, lineHeight: 1.25 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: theme.inkMuted, marginTop: 3 }}>{s.body}</div>
                  <a onClick={() => go(s.to)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 7, fontFamily: 'Geist', fontSize: 13, fontWeight: 600, color: theme.brand, cursor: 'pointer' }}>
                    {s.cta} <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND ROW — shortlist + recent + recommender tracker */}
      <div style={{ padding: '0 56px 56px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr 0.9fr', gap: 24 }}>
        {/* Shortlist */}
        <div style={{ border: `1px solid ${theme.hairlineFaint}`, borderRadius: 16, padding: '22px 24px', background: theme.bg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted }}>{t('Active shortlist', '当前候选')}</div>
            <a onClick={() => go('discover')} style={{ fontFamily: 'Geist', fontSize: 13, color: theme.brand, fontWeight: 500, cursor: 'pointer' }}>{t('5 of 12 →', '5 / 12 →')}</a>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { c: A.pink,   name: 'Fieldwork Issue 2',                          when: t('6 May', '5 月 6 日'),  fit: 'solid'   },
              { c: A.pink,   name: 'ZRFDBCK Drift',                              when: t('20 May', '5 月 20 日'), fit: 'solid'   },
              { c: A.teal,   name: 'Screening Weekender',                        when: t('30 May', '5 月 30 日'), fit: 'solid'   },
              { c: A.violet, name: t('Performing Arts Res.', '表演艺术驻地'),    when: t('10 Jun', '6 月 10 日'), fit: 'solid'   },
              { c: A.yellow, name: 'Design Open Lab',                            when: t('18 May', '5 月 18 日'), fit: 'partial' },
            ].map((o, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: i < 4 ? `1px solid ${theme.hairlineFaint}` : 'none' }}>
                <Bullet color={o.c} size={11} />
                <span style={{ flex: 1, fontFamily: 'Geist', fontSize: 14.5, fontWeight: 500, color: theme.ink, letterSpacing: '-0.005em' }}>{o.name}</span>
                <Status kind={o.fit} theme={theme} />
                <span style={{ fontSize: 12.5, color: theme.inkMuted, minWidth: 50, textAlign: 'right' }}>{o.when}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommender tracker */}
        <div style={{ border: `1px solid ${theme.hairlineFaint}`, borderRadius: 16, padding: '22px 24px', background: theme.bg }}>
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 14 }}>{t('Recommenders', '推荐人')}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
            <span style={{ fontFamily: theme.serif, fontSize: 42, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, color: theme.ink }}>2</span>
            <span style={{ fontSize: 13, color: theme.inkMuted }}>{t('of 3 confirmed', '/ 3 已确认')}</span>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { c: A.mint,   name: 'Dr. R. Andoh',                                  org: t('Goldsmiths · Curating', 'Goldsmiths · 策展'),               status: 'received' },
              { c: A.mint,   name: 'M. Larsson',                                    org: t('Tate Modern · Public Prog.', 'Tate Modern · 公共项目'),     status: 'received' },
              { c: A.yellow, name: t('TBD — third letter', '待定 — 第三封推荐信'),    org: t('No commitment yet', '尚未确认'),                          status: 'pending' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Bullet color={r.c} size={12} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: theme.ink, letterSpacing: '-0.005em' }}>{r.name}</div>
                  <div style={{ fontSize: 12.5, color: theme.inkMuted }}>{r.org}</div>
                </div>
                <Status kind={r.status} theme={theme} />
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div style={{ border: `1px solid ${theme.hairlineFaint}`, borderRadius: 16, padding: '22px 24px', background: theme.bg }}>
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 14 }}>{t('Recent activity', '最近动态')}</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '12px 1fr', gap: 12 }}>
                <Bullet color={a.c} size={10} style={{ marginTop: 6 }} />
                <div>
                  <div style={{ fontFamily: 'Geist', fontSize: 13.5, fontWeight: 500, color: theme.ink, lineHeight: 1.35, letterSpacing: '-0.005em' }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: theme.inkMuted, marginTop: 2 }}>{a.meta} · {a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.DashboardScreen = DashboardScreen;

/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, useNav, useAnswers */

function LandingScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();
  const { answers, step, reset } = useAnswers();

  const hasProgress = step > 0 || (Array.isArray(answers.fields) && answers.fields.length > 0);
  const startFresh = () => { reset(); go('onboarding'); };
  const resumeCheck = () => go(step > 0 ? 'quiz' : 'onboarding');

  // Hero mind-map layout — central hub, 8 satellite nodes.
  // Canvas is 1180 wide × 620 tall; nodes positioned absolutely.
  const hubX = 590, hubY = 310;
  const nodes = [
    { x: 110,  y: 90,  anchor: 'start', color: A.pink,   label: t('Evidence categories', '证据类别'), sub: t('Exhibitions · publications · awards', '展览 · 出版 · 奖项') },
    { x: 110,  y: 250, anchor: 'start', color: A.tan,    label: t('ACE criteria', 'ACE 标准'),        sub: t('Home Office / ACE guidance · monitored', 'Home Office / ACE 指引 · 持续追踪') },
    { x: 110,  y: 410, anchor: 'start', color: A.teal,   label: t('Endorsing bodies', 'Endorsing body'),    sub: t('Arts Council England · ACE pathway', 'Arts Council England · ACE 路径') },
    { x: 110,  y: 560, anchor: 'start', color: A.violet, label: t('Narrative & sequence', '叙述与时序'), sub: t('Why now · why the UK · what next', '为何此时 · 为何英国 · 接下来') },

    { x: 1070, y: 90,  anchor: 'end',   color: A.yellow, label: t('Recommenders', '推荐人'),         sub: t('Three verifiable letters', '三封可核实的推荐信') },
    { x: 1070, y: 250, anchor: 'end',   color: A.mint,   label: t('Opportunity types', '机会类型'),    sub: t('Residencies · screenings · shows', '驻地 · 放映 · 展览') },
    { x: 1070, y: 410, anchor: 'end',   color: A.lilac,  label: t('Timing & windows', '时机与窗口'),     sub: t('Evidence recency alignment', '证据时效性对齐') },
    { x: 1070, y: 560, anchor: 'end',   color: A.mauve,  label: t('Excluded', '不计入'),             sub: t('Pay-to-publish · pay-to-exhibit', '付费发表 · 付费展览') },
  ];

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="home" />

      {/* HERO */}
      <div style={{ padding: '72px 56px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <Bullet color={theme.brand} size={10} />
          <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13.5, letterSpacing: '0.02em', color: theme.inkMuted }}>
            {t('UK Global Talent Visa · Arts & Culture · ACE pathway', '英国 Global Talent 签证 · 艺术与文化 · ACE 路径')}
          </span>
        </div>
        <h1 style={{
          fontFamily: theme.serif,
          fontWeight: 400,
          fontSize: 76,
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          margin: '0 auto 22px',
          textWrap: 'balance',
          color: theme.ink,
          maxWidth: 980,
        }}>
          {t(
            <>A <em style={{ fontStyle: 'italic', color: theme.brand, fontWeight: 400 }}>map</em> of your readiness — not another checklist.</>,
            <>一张准备度的<em style={{ fontStyle: 'italic', color: theme.brand, fontWeight: 400 }}>地图</em>——而不是又一份清单。</>
          )}
        </h1>
        <p style={{
          fontSize: 18,
          lineHeight: 1.55,
          color: theme.inkMuted,
          maxWidth: 640,
          margin: '0 auto 32px',
          textWrap: 'pretty',
        }}>
          {t(
            'Structured information analysis for applicants already in the preparation phase. We map eight dimensions of your profile against Home Office / ACE guidance as we currently read it — then show you what looks solid, what looks thin, and what to do next.',
            '面向已进入准备阶段的申请人，提供结构化信息分析。我们将你 profile 的八个维度对照我们当前理解的 Home Office / ACE 指引——告诉你哪些看起来稳健、哪些薄弱、接下来该做什么。'
          )}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {hasProgress ? (
            <>
              <Btn variant="primary" theme={theme} onClick={resumeCheck}>{t('Resume readiness check', '继续上次评估')}</Btn>
              <Btn theme={theme} onClick={startFresh}>{t('Start over', '重新开始')}</Btn>
            </>
          ) : (
            <Btn variant="primary" theme={theme} onClick={startFresh}>{t('Start readiness check', '开始准备度评估')}</Btn>
          )}
        </div>
      </div>

      {/* MIND MAP */}
      <div style={{ padding: '20px 56px 60px' }}>
        <MindMap width={1168} height={660} theme={theme}>
          {/* Connectors (SVG overlay) */}
          <svg width={1168} height={660} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {nodes.map((n, i) => (
              <MMLine key={i}
                x1={hubX} y1={hubY}
                x2={n.x + (n.anchor === 'end' ? -8 : 8)} y2={n.y}
                color={theme.connector}
                width={1}
              />
            ))}
          </svg>

          {/* Hub */}
          <MMHub x={hubX} y={hubY} size={28} theme={theme} label={t('Your Candidacy profile', '你的 Candidacy profile')} />
          <div style={{
            position: 'absolute', left: hubX, top: hubY + 60,
            transform: 'translateX(-50%)',
            fontFamily: 'Geist', fontSize: 13, color: theme.inkMuted,
            fontWeight: 500, letterSpacing: '-0.005em', whiteSpace: 'nowrap',
          }}>
            {t('mapped across 8 dimensions', '映射到 8 个维度')}
          </div>

          {/* Satellite nodes */}
          {nodes.map((n, i) => (
            <MMNode key={i} theme={theme} {...n} />
          ))}
        </MindMap>
      </div>

      {/* GAP SCAN — the one thing on offer at MVP */}
      <div style={{ padding: '60px 56px 72px', background: theme.surface }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Bullet color={A.pink} size={10} />
            <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 12.5, letterSpacing: '0.03em', textTransform: 'uppercase', color: theme.inkMuted }}>
              {t('Candidacy Scan · free diagnostic', 'Candidacy 体检 · 免费诊断')}
            </span>
          </div>
          <ColorHeader color={theme.ink} size={36}>
            {t('Am I ready to prepare at all?', '我现在适合开始准备吗？')}
          </ColorHeader>
          <p style={{ fontSize: 15.5, color: theme.inkMuted, maxWidth: 600, margin: '14px 0 24px', lineHeight: 1.6 }}>
            {t(
              'A structured 5–10 minute check. You get a 0–100 readiness map and a gap list — no sales pitch.',
              '5 至 10 分钟的结构化评估，输出 0–100 的准备度地图与缺口清单——没有推销。'
            )}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {hasProgress ? (
              <>
                <Btn variant="primary" theme={theme} onClick={resumeCheck}>{t('Resume readiness check', '继续上次评估')}</Btn>
                <Btn theme={theme} onClick={startFresh}>{t('Start over', '重新开始')}</Btn>
              </>
            ) : (
              <Btn variant="primary" theme={theme} onClick={startFresh}>{t('Start readiness check', '开始准备度评估')}</Btn>
            )}
          </div>
        </div>
      </div>

      {/* IS / ISN'T */}
      <div style={{ padding: '72px 56px 56px' }}>
        <div style={{ marginBottom: 40, maxWidth: 720 }}>
          <ColorHeader color={theme.ink} size={44}>{t(
            <>What Candidacy <em style={{ fontStyle: 'italic', color: theme.brand, fontWeight: 400 }}>is</em> — and isn’t</>,
            <>Candidacy <em style={{ fontStyle: 'italic', color: theme.brand, fontWeight: 400 }}>是</em>什么——又不是什么</>
          )}</ColorHeader>
          <p style={{ fontSize: 15.5, color: theme.inkMuted, margin: '16px 0 0', lineHeight: 1.6 }}>
            {t(
              'ACE pathway scope and route boundaries shift over time, and route confusion is a recurring risk. We keep a working reading of Home Office and ACE guidance and re-check it when sources change — that’s the gap we try to fill.',
              'ACE 路径的范围与边界会随时间调整，路径混淆也是持续存在的风险。我们维护对 Home Office 与 ACE 指引的当前理解，并会在来源更新时重新核对——这是我们要填补的空缺。'
            )}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, borderTop: `1px solid ${theme.line}`, paddingTop: 36 }}>
          <div>
            <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.brand, margin: '0 0 22px' }}>{t('What it is', '它是什么')}</div>
            <div style={{ display: 'grid', gap: 20 }}>
              <BulletItem theme={theme} color={A.blue} sub={t('A working reading of Home Office / ACE guidance, re-checked when sources change.', '我们对 Home Office / ACE 指引的当前理解，并会在来源更新时重新核对。')}>{t('Reference base', '参考库')}</BulletItem>
              <BulletItem theme={theme} color={A.blue} sub={t('Judgement over evidence quality and preparation sequencing.', '对证据质量与准备时序的判断。')}>{t('Judgement layer', '判断层')}</BulletItem>
              <BulletItem theme={theme} color={A.blue} sub={t('Delivered through an AI interface — not by an AI.', '通过 AI 界面交付——而不是由 AI 给出答案。')}>{t('Interface ≠ source', '界面 ≠ 信息源')}</BulletItem>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, margin: '0 0 22px' }}>{t('What it is not', '它不是什么')}</div>
            <div style={{ display: 'grid', gap: 20 }}>
              <BulletItem theme={theme} color={A.mauve} sub={t('Not a law firm or immigration adviser.', '不是律师事务所，也不是移民顾问。')}>{t('Not legal advice', '不是法律意见')}</BulletItem>
              <BulletItem theme={theme} color={A.mauve} sub={t('Not a visa agency or document mill.', '不是签证代办，也不代写材料。')}>{t('Not an agency', '不是代办机构')}</BulletItem>
              <BulletItem theme={theme} color={A.mauve} sub={t('Not a chatbot answering from training data alone.', '不是仅靠训练数据回答的通用聊天机器人。')}>{t('Not a chatbot', '不是聊天机器人')}</BulletItem>
              <BulletItem theme={theme} color={A.mauve} sub={t('Never cooperates with pay-to-publish or pay-to-exhibit services.', '从不与付费发表或付费展览服务合作。')}>{t('No vanity evidence', '不计入 vanity evidence')}</BulletItem>
            </div>
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.LandingScreen = LandingScreen;

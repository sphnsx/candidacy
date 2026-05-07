/* global React, Bullet, useNav, useLang, useAnswers, MFrame, MTopBar, MFooter, MBtn, MEyebrow, MHeader, PALETTE */
// Mobile landing — Candidacy Scan free diagnostic.
// Uses production navigation ('landing' → 'onboarding'), and respects
// the same in-progress detection as the desktop landing (resume vs fresh start).

const M_LANDING_T = {
  hero_eyebrow: { en: 'Candidacy Scan · Free', zh: 'Candidacy 体检 · 免费' },
  hero_title: {
    en: ['A maintained readiness ', 'analysis', ' for the UK Global Talent Visa — ACE pathway.'],
    zh: ['面向英国 Global Talent 签证 ACE 路径的', '持续维护', '准备度分析。'],
  },
  hero_sub: {
    en: 'Free 5–10 minute Candidacy Scan tells you broadly where you stand against current ACE criteria. Diagnosis only — what is, not what to do.',
    zh: '免费 5 至 10 分钟 Candidacy 体检，基于当前 ACE 标准告诉你大致位置。仅做诊断：现状是什么，不告诉你该怎么做。',
  },
  cta_scan:    { en: 'Start the free Scan',     zh: '开始免费体检' },
  cta_resume:  { en: 'Resume readiness check',  zh: '继续上次评估' },
  cta_restart: { en: 'Start over',              zh: '重新开始' },
  trust1:      { en: 'No login. ~5–10 minutes.', zh: '无需登录。约 5 至 10 分钟。' },
  trust2:      { en: 'No outcome guarantees, ever.', zh: '不承诺 endorsement 结果。' },

  layers_eyebrow: { en: 'Three layers, one structure', zh: '三层结构，一条主线' },
  layers_title:   { en: 'From Scan to full Candidacy', zh: '从体检到完整 Candidacy' },
  l1_title: { en: 'Candidacy Scan',    zh: 'Candidacy 体检' },
  l1_meta:  { en: 'Free · ~5–10 min',   zh: '免费 · 约 5 至 10 分钟' },
  l1_body:  { en: 'A short diagnostic. Roughly where you stand against ACE scope. The entry point.',
              zh: '简短诊断。你与 ACE 路径范围的大致契合度。入口。' },
  l2_title: { en: 'Candidacy Preview', zh: 'Candidacy 预览' },
  l2_meta:  { en: 'Paid · 24–48 h',     zh: '付费 · 24–48 小时' },
  l2_body:  { en: 'Deep diagnosis of your case. Strengths, weaknesses, gaps, risk flags + one-line strategic direction. Decision point — unlock or refund.',
              zh: '案例深度诊断。强项、弱项、缺口、风险标记 + 一句话策略方向。决策点——解锁或退款。' },
  l3_title: { en: 'Full Candidacy',    zh: 'Full Candidacy' },
  l3_meta:  { en: 'Unlocked',           zh: '解锁后' },
  l3_body:  { en: 'Strategy, opportunity shortlist, evidence plan, 30/60/90-day pipeline. + 1 free update within 14 days.',
              zh: '策略、机会 shortlist、证据计划、30/60/90 天 pipeline。+ 14 天内免费更新一次。' },

  isnt_eyebrow: { en: 'What it is — and isn’t', zh: '是什么——以及不是什么' },
  isnt_title: {
    en: ['Honest analysis ', 'against published criteria', '. Not advice. Not a guarantee.'],
    zh: ['基于公开标准的', '诚实分析', '。不是建议，不是保证。'],
  },
  is_label:    { en: 'IS',     zh: '是' },
  isnot_label: { en: 'IS NOT', zh: '不是' },
  is1: { en: 'A working reading of Home Office and ACE guidance, re-checked when sources change.',
         zh: '我们对 Home Office 与 ACE 指引的当前理解，在来源更新时重新核对。' },
  is2: { en: 'Judgement over evidence quality, recency, and preparation sequencing — not whether you’ll be endorsed.',
         zh: '对证据质量、时效性与准备时序的判断——而不是预测你能否获得 endorsement。' },
  is3: { en: 'A structured diagnostic delivered through an AI interface, not a chatbot answer.',
         zh: '通过 AI 界面交付的结构化诊断，而不是聊天机器人的回答。' },
  isnot1: { en: 'A law firm, visa agency, or OISC-regulated immigration adviser.',
            zh: '律师事务所、签证代办，或受 OISC 监管的移民顾问。' },
  isnot2: { en: 'A predictor of endorsement outcomes — no one can model that reliably.',
            zh: 'Endorsement 结果的预测器——没人能稳定建模这件事。' },
  isnot3: { en: 'A partner of vanity-evidence services. Pay-to-exhibit / pay-to-publish are excluded by design.',
            zh: 'vanity evidence 服务的合作方。付费展览 / 付费发表在设计上被排除。' },

  cov_eyebrow: { en: 'Coverage at launch', zh: '首发覆盖范围' },
  cov_title:   { en: 'ACE pathway, sub-routes', zh: 'ACE 路径，sub-route' },
  cov_sub: {
    en: 'Visual arts, fashion, architecture, film & television, design (design opens 1 July 2026 under HC 1691). Digital Technology and Academia & Research are planned, not yet covered.',
    zh: '视觉艺术、时尚、建筑、影视、设计（设计 sub-route 自 2026 年 7 月 1 日起根据 HC 1691 纳入）。Digital Technology 与 Academia & Research 在规划中，尚未覆盖。',
  },

  end_eyebrow: { en: 'Start with the Scan', zh: '从体检开始' },
  end_title:   { en: 'Five to ten minutes. No login. A diagnostic, not a verdict.',
                 zh: '5 至 10 分钟。无需登录。诊断，不是判决。' },
};

function MLandingScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const { answers, step, reset } = useAnswers();
  const t = (k) => { const v = M_LANDING_T[k]; return v ? (v[lang] || v.en) : k; };

  const hasProgress = step > 0 || (Array.isArray(answers.fields) && answers.fields.length > 0);
  const startFresh  = () => { reset(); go('onboarding'); };
  const resumeCheck = () => go(step > 0 ? 'quiz' : 'onboarding');

  const layers = [
    { id: 'scan',    color: PALETTE.mint,   title: t('l1_title'), meta: t('l1_meta'), body: t('l1_body'), free: true },
    { id: 'preview', color: PALETTE.yellow, title: t('l2_title'), meta: t('l2_meta'), body: t('l2_body'), free: false },
    { id: 'full',    color: A,              title: t('l3_title'), meta: t('l3_meta'), body: t('l3_body'), free: false },
  ];

  return (
    <MFrame theme={theme}>
      <MTopBar theme={theme} />

      {/* HERO */}
      <div style={{ padding: '28px 18px 32px' }}>
        <MEyebrow theme={theme} color={A}>{t('hero_eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={30}>
          {t('hero_title')[0]}
          <em style={{ fontStyle: 'italic', color: A, fontWeight: 400 }}>{t('hero_title')[1]}</em>
          {t('hero_title')[2]}
        </MHeader>
        <p style={{
          margin: '18px 0 22px', fontSize: 14.5, lineHeight: 1.55, color: theme.inkMuted,
          textWrap: 'pretty',
        }}>{t('hero_sub')}</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {hasProgress ? (
            <>
              <MBtn theme={theme} variant="primary" fullWidth onClick={resumeCheck}>
                {t('cta_resume')} →
              </MBtn>
              <MBtn theme={theme} variant="ghost" fullWidth onClick={startFresh}>
                {t('cta_restart')}
              </MBtn>
            </>
          ) : (
            <MBtn theme={theme} variant="primary" fullWidth onClick={startFresh}>
              {t('cta_scan')} →
            </MBtn>
          )}
        </div>
        <div style={{
          marginTop: 18, display: 'flex', alignItems: 'center', gap: 14,
          fontSize: 11.5, color: theme.inkMuted,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Bullet color={PALETTE.mint} size={7} />{t('trust1')}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Bullet color={PALETTE.tan} size={7} />{t('trust2')}
          </span>
        </div>
      </div>

      {/* THREE-LAYER STRUCTURE */}
      <div style={{ padding: '28px 18px 32px', background: theme.surface || theme.hairlineFaint + '40' }}>
        <MEyebrow theme={theme} color={A}>{t('layers_eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={22}>{t('layers_title')}</MHeader>
        <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
          {layers.map((l, i) => (
            <div key={l.id} style={{
              position: 'relative',
              border: `1px solid ${theme.hairlineFaint}`,
              borderRadius: 14, background: theme.bg,
              padding: '16px 16px 16px 20px',
              display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14, alignItems: 'start',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <Bullet color={l.color} size={11} />
                {i < 2 && <div style={{ width: 1, flex: 1, minHeight: 30, background: theme.hairlineFaint, marginTop: 4 }} />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 14, color: theme.ink, letterSpacing: '-0.01em' }}>
                    {l.title}
                  </span>
                  <span style={{
                    fontFamily: 'Geist', fontSize: 10.5, fontWeight: 500, color: theme.inkMuted,
                    background: l.free ? PALETTE.mint + '30' : theme.hairlineFaint,
                    padding: '3px 7px', borderRadius: 999, letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                  }}>{l.meta}</span>
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 13, color: theme.inkMuted, lineHeight: 1.5, textWrap: 'pretty' }}>{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IS / IS NOT */}
      <div style={{ padding: '32px 18px 28px' }}>
        <MEyebrow theme={theme} color={A}>{t('isnt_eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={22}>
          {t('isnt_title')[0]}
          <em style={{ fontStyle: 'italic', color: A, fontWeight: 400 }}>{t('isnt_title')[1]}</em>
          {t('isnt_title')[2]}
        </MHeader>
        <div style={{ display: 'grid', gap: 18, marginTop: 22 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Bullet color={PALETTE.mint} size={8} />
              <span style={{ fontFamily: 'Geist', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: theme.ink }}>{t('is_label')}</span>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {[t('is1'), t('is2'), t('is3')].map((s, i) => (
                <div key={i} style={{
                  fontSize: 13, lineHeight: 1.5, color: theme.ink,
                  paddingLeft: 14, position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 1, background: PALETTE.mint }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Bullet color={PALETTE.tan} size={8} />
              <span style={{ fontFamily: 'Geist', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: theme.ink }}>{t('isnot_label')}</span>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {[t('isnot1'), t('isnot2'), t('isnot3')].map((s, i) => (
                <div key={i} style={{
                  fontSize: 13, lineHeight: 1.5, color: theme.inkMuted,
                  paddingLeft: 14, position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 1, background: PALETTE.tan }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COVERAGE */}
      <div style={{ padding: '24px 18px 32px', background: theme.surface || theme.hairlineFaint + '40' }}>
        <MEyebrow theme={theme} color={A}>{t('cov_eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={20}>{t('cov_title')}</MHeader>
        <p style={{ margin: '14px 0 16px', fontSize: 13, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
          {t('cov_sub')}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            { en: 'Visual arts',         zh: '视觉艺术' },
            { en: 'Fashion',             zh: '时尚' },
            { en: 'Architecture',        zh: '建筑' },
            { en: 'Film & TV',           zh: '影视' },
            { en: 'Design · Jul 2026',   zh: '设计 · 2026年7月' },
          ].map((s, i) => (
            <span key={i} style={{
              fontFamily: 'Geist', fontSize: 11.5, fontWeight: 500, color: theme.ink,
              padding: '6px 10px', borderRadius: 999,
              border: `1px solid ${theme.hairlineFaint}`, background: theme.bg,
            }}>{s[lang] || s.en}</span>
          ))}
        </div>
      </div>

      {/* END CTA */}
      <div style={{ padding: '32px 18px 36px' }}>
        <MEyebrow theme={theme} color={A}>{t('end_eyebrow')}</MEyebrow>
        <MHeader theme={theme} size={24}>{t('end_title')}</MHeader>
        <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
          {hasProgress ? (
            <>
              <MBtn theme={theme} variant="primary" fullWidth onClick={resumeCheck}>
                {t('cta_resume')} →
              </MBtn>
              <MBtn theme={theme} variant="ghost" fullWidth onClick={startFresh}>
                {t('cta_restart')}
              </MBtn>
            </>
          ) : (
            <MBtn theme={theme} variant="primary" fullWidth onClick={startFresh}>
              {t('cta_scan')} →
            </MBtn>
          )}
        </div>
      </div>

      <MFooter theme={theme} />
    </MFrame>
  );
}

window.MLandingScreen = MLandingScreen;

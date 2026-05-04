/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, useNav, useT, useLang, useAnswers, FIELDS */

function OnboardingScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();
  const { lang } = useLang();
  const { answers, toggleMulti, setAnswer } = useAnswers();
  const step = 1, total = 2;

  const selectedFields = Array.isArray(answers.fields) ? answers.fields : [];
  const fieldColors = [A.pink, A.teal, A.violet, A.yellow, A.tan, A.lilac, A.mint];

  const routes = FIELDS.map((f, i) => ({
    key: f.id,
    label: f.labels[lang] || f.labels.en,
    sub: '',
    c: fieldColors[i % fieldColors.length],
    selected: selectedFields.includes(f.id),
  }));

  const stepsList = [
    { n: 1, label: t('Pick your routes', '选择路径'),        done: false, current: true },
    { n: 2, label: t('Readiness check', '准备度评估'),       done: false },
  ];

  const canContinue = selectedFields.length > 0;

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="" />

      {/* Step indicator */}
      <div style={{ padding: '20px 56px', borderBottom: `1px solid ${theme.hairlineFaint}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 13.5, color: theme.ink }}>
            {t(<>Step {step} <span style={{ color: theme.inkFaint, fontWeight: 400 }}>of {total}</span></>,
               <>第 {step} 步 <span style={{ color: theme.inkFaint, fontWeight: 400 }}>共 {total} 步</span></>)}
          </span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
            {stepsList.map((s, i) => (
              <React.Fragment key={s.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Bullet color={s.done ? theme.brand : s.current ? theme.brand : theme.hairlineFaint} size={s.current ? 14 : 10}
                    ring={s.current ? theme.brand + '33' : undefined} />
                  <span style={{
                    fontFamily: 'Geist', fontSize: 13, fontWeight: s.current ? 600 : 500,
                    color: s.current ? theme.ink : s.done ? theme.inkMuted : theme.inkFaint,
                    letterSpacing: '-0.005em',
                  }}>{s.label}</span>
                </div>
                {i < stepsList.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: theme.hairlineFaint, margin: '0 16px' }} />
                )}
              </React.Fragment>
            ))}
          </div>
          <Btn theme={theme} onClick={() => go('landing')} style={{ padding: '6px 12px', fontSize: 12.5 }}>{t('Save & exit', '保存并退出')}</Btn>
        </div>
      </div>

      <div style={{ padding: '64px 56px 80px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Bullet color={A.pink} size={11} />
            <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.03em', color: theme.inkMuted, textTransform: 'uppercase' }}>
              {t('Routes & disciplines', '路径与领域')}
            </span>
          </div>
          <h1 style={{
            fontFamily: theme.serif, fontWeight: 400, fontSize: 58, letterSpacing: '-0.024em',
            margin: '0 0 14px', lineHeight: 1.02, textWrap: 'balance', color: theme.ink, maxWidth: 840,
          }}>
            {t('Which ACE routes does your practice sit across?', '你的实践跨越哪些 ACE 路径？')}
          </h1>
          <p style={{ color: theme.inkMuted, fontSize: 16.5, maxWidth: 640, margin: '0 0 40px', lineHeight: 1.55 }}>
            {t(
              'We scope every map, judgement and recommendation to the routes you select. Pick all that apply — most applicants sit across two.',
              '我们会根据你选择的路径来限定每一张地图、每一项判断和每一条建议的范围。请勾选所有适用项——大多数申请人会跨两个路径。'
            )}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {routes.map((r, i) => (
              <div key={r.key} onClick={() => toggleMulti('fields', r.key, 3)} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 20px',
                borderRadius: 14,
                border: `1px solid ${r.selected ? theme.brand : theme.hairlineFaint}`,
                background: r.selected ? 'rgba(59,144,242,0.06)' : theme.bg,
                cursor: 'pointer',
                userSelect: 'none',
              }}>
                <Bullet color={r.c} size={16} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Geist', fontSize: 17, fontWeight: 600, color: theme.ink, letterSpacing: '-0.01em' }}>{r.label}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: `1.5px solid ${r.selected ? theme.brand : theme.hairlineFaint}`,
                  background: r.selected ? theme.brand : 'transparent',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 700,
                }}>{r.selected ? '✓' : ''}</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 28, padding: '16px 20px', borderRadius: 12,
            border: `1px solid ${theme.hairlineFaint}`,
            background: theme.surface,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <Bullet color={A.sky} size={11} />
            <div style={{ flex: 1, fontSize: 13.5, color: theme.inkMuted, lineHeight: 1.5 }}>
              {selectedFields.length === 0
                ? t('Pick at least one route to continue. You can change this later.', '请至少选择一个路径才能继续。之后随时可以修改。')
                : t(
                    <>You’ve selected <strong style={{ color: theme.ink, fontWeight: 600 }}>{selectedFields.length} {selectedFields.length === 1 ? 'route' : 'routes'}</strong>. After the readiness check we’ll show the strongest as your primary route.</>,
                    <>你已选择 <strong style={{ color: theme.ink, fontWeight: 600 }}>{selectedFields.length} 个路径</strong>。准备度评估之后我们会把最强的标为主路径。</>
                  )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
            <Btn theme={theme} onClick={() => go('landing')}>{t('← Back', '← 返回')}</Btn>
            <Btn variant="primary" theme={theme} onClick={() => canContinue && go('quiz')}
              style={{ opacity: canContinue ? 1 : 0.45, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
              {t('Continue to readiness check →', '继续进入准备度评估 →')}
            </Btn>
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </Frame>
  );
}

window.OnboardingScreen = OnboardingScreen;

/* global React, Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, MMNode, MMHub, MMLine, MindMap, useNav, useT, useLang, useAnswers, QUESTIONS, SECTION_LABELS, calculateResult */

function QuizScreen({ theme }) {
  const A = theme.accent;
  const { go } = useNav();
  const t = useT();
  const { lang } = useLang();
  const { answers, setAnswer, toggleMulti, step, setStep } = useAnswers();

  const sectionColors = [A.pink, A.yellow, A.mint, A.violet];
  const total = QUESTIONS.length;
  const current = Math.min(Math.max(step, 0), total - 1);
  const question = QUESTIONS[current];
  const options = question.getOptions ? question.getOptions(answers) : (question.options || []);
  const value = answers[question.id];
  const sectionLabel = SECTION_LABELS[lang === 'zh' ? 'zh' : 'en'][question.section];
  const sectionColor = sectionColors[question.section] || A.brand;

  const isAnswered = question.type === 'multi'
    ? Array.isArray(value) && value.length > 0
    : value != null && value !== '';

  // Progress sidebar — show 4 sections; each section's status reflects answers.
  const sectionStatus = [0, 1, 2, 3].map(secIdx => {
    const qsInSec = QUESTIONS.filter(q => q.section === secIdx);
    const allAnswered = qsInSec.every(q => {
      const v = answers[q.id];
      return q.type === 'multi' ? Array.isArray(v) && v.length > 0 : v != null && v !== '';
    });
    if (allAnswered) return 'done';
    if (secIdx === question.section) return 'current';
    if (secIdx < question.section) return 'done';
    return 'todo';
  });

  // Provisional score from answers so far
  const provisional = React.useMemo(() => calculateResult(answers, lang), [answers, lang]);

  function next() {
    if (!isAnswered) return;
    if (current < total - 1) setStep(current + 1);
    else go('results');
  }
  function prev() {
    if (current > 0) setStep(current - 1);
    else go('onboarding');
  }
  function pickSingle(key) { setAnswer(question.id, key); }
  function pickMulti(key) { toggleMulti(question.id, key, question.maxSelect, question.exclusiveOption); }

  const stepNum = current + 1;
  const pct = Math.round((stepNum / total) * 100);

  return (
    <Frame theme={theme} width={1280}>
      <TopNav theme={theme} active="check" />

      {/* Progress */}
      <div style={{ padding: '20px 56px', borderBottom: `1px solid ${theme.hairlineFaint}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 13.5, color: theme.ink, letterSpacing: '-0.005em' }}>
            {t(<>Question {stepNum} <span style={{ color: theme.inkFaint, fontWeight: 400 }}>of {total}</span></>,
               <>第 {stepNum} 题 <span style={{ color: theme.inkFaint, fontWeight: 400 }}>共 {total} 题</span></>)}
          </span>
          <div style={{ flex: 1, height: 3, background: theme.hairlineFaint, position: 'relative', borderRadius: 2 }}>
            <div style={{ position: 'absolute', inset: 0, right: 'auto', width: `${pct}%`, background: theme.brand, borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: 'Geist', fontSize: 13, color: theme.inkMuted }}>{pct}%</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', minHeight: 760 }}>
        {/* LEFT: question + options */}
        <div style={{ padding: '52px 56px', borderRight: `1px solid ${theme.hairlineFaint}` }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Bullet color={sectionColor} size={11} />
            <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13, letterSpacing: '0.03em', color: theme.inkMuted, textTransform: 'uppercase' }}>
              {t(`Section ${question.section + 1} · ${SECTION_LABELS.en[question.section]}`,
                 `第 ${question.section + 1} 部分 · ${SECTION_LABELS.zh[question.section]}`)}
            </span>
          </div>
          <h1 style={{
            fontFamily: theme.serif, fontWeight: 400, fontSize: 38, letterSpacing: '-0.02em',
            margin: '0 0 14px', lineHeight: 1.1, textWrap: 'balance', maxWidth: 780, color: theme.ink,
          }}>
            {question.title[lang] || question.title.en}
          </h1>
          {question.desc && (
            <p style={{ color: theme.inkMuted, fontSize: 15, margin: '0 0 10px', maxWidth: 640, lineHeight: 1.55 }}>
              {question.desc[lang] || question.desc.en}
            </p>
          )}
          {question.maxSelect && (
            <p style={{ color: theme.inkFaint, fontSize: 13, margin: '0 0 10px' }}>
              {t(`Pick up to ${question.maxSelect}.`, `最多可选 ${question.maxSelect} 项。`)}
            </p>
          )}

          <div style={{ marginTop: 24, display: 'grid', gap: 8 }}>
            {options.map((opt, i) => {
              const display = opt.labels[lang] || opt.labels.en;
              const selected = question.type === 'multi'
                ? Array.isArray(value) && value.includes(opt.id)
                : value === opt.id;
              const colorPalette = [A.pink, A.tan, A.teal, A.yellow, A.lilac, A.mint, A.sky, A.violet, A.mauve];
              const dotColor = colorPalette[i % colorPalette.length];
              return (
                <div key={opt.id} onClick={() => question.type === 'multi' ? pickMulti(opt.id) : pickSingle(opt.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: `1px solid ${selected ? theme.brand : theme.hairlineFaint}`,
                  background: selected ? 'rgba(59,144,242,0.06)' : theme.bg,
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.12s ease',
                }}>
                  <Bullet color={dotColor} size={14} />
                  <span style={{
                    flex: 1,
                    fontFamily: 'Geist', fontSize: 15.5,
                    fontWeight: 500,
                    color: theme.ink,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.4,
                  }}>{display}</span>
                  {selected && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: 'Geist', fontWeight: 500, fontSize: 12, letterSpacing: '-0.005em',
                      color: theme.brand,
                    }}>
                      <Bullet color={theme.brand} size={7} /> {t('Selected', '已选')}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
            <Btn theme={theme} onClick={prev}>{current === 0 ? t('← Back', '← 返回') : t('← Previous', '← 上一题')}</Btn>
            <Btn variant="primary" theme={theme} onClick={next}
              style={{ opacity: isAnswered ? 1 : 0.45, cursor: isAnswered ? 'pointer' : 'not-allowed' }}>
              {current === total - 1 ? t('See results →', '查看结果 →') : t('Next question →', '下一题 →')}
            </Btn>
          </div>
        </div>

        {/* RIGHT: progress sidebar */}
        <div style={{ padding: '48px 32px', background: theme.surface }}>
          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 14 }}>
            {t('Your progress map', '你的进度地图')}
          </div>

          <div style={{ position: 'relative', height: 260, marginBottom: 8 }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {[0,1,2,3].map(i => (
                <MMLine key={i} x1={40} y1={130} x2={180} y2={24 + i * 66} color={theme.connector} />
              ))}
            </svg>
            <div style={{
              position: 'absolute', left: 40, top: 130,
              transform: 'translate(-50%, -50%)',
              width: 22, height: 22, borderRadius: '50%',
              background: theme.brand,
              boxShadow: `0 0 0 8px ${theme.brand}22`,
            }} />
            {[0,1,2,3].map(i => {
              const status = sectionStatus[i];
              const c = sectionColors[i];
              return (
                <div key={i} style={{
                  position: 'absolute',
                  left: 180, top: 24 + i * 66,
                  transform: 'translateY(-50%)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <Bullet color={status === 'todo' ? theme.hairlineFaint : c} size={12}
                    ring={status === 'current' ? c + '40' : undefined} />
                  <div>
                    <div style={{
                      fontFamily: 'Geist', fontSize: 13.5, fontWeight: 600,
                      color: status === 'todo' ? theme.inkFaint : theme.ink,
                      letterSpacing: '-0.005em', lineHeight: 1.2,
                    }}>{SECTION_LABELS[lang === 'zh' ? 'zh' : 'en'][i]}</div>
                    <div style={{ fontSize: 11.5, color: theme.inkMuted, marginTop: 2 }}>
                      {status === 'done' ? t('Complete', '已完成') : status === 'current' ? t('In progress', '进行中') : t('Up next', '即将开始')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Rule theme={theme} style={{ margin: '24px 0' }} />

          <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: theme.inkMuted, marginBottom: 12 }}>
            {t('Provisional score', '初步评分')}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
            <span style={{ fontFamily: theme.serif, fontSize: 60, fontWeight: 400, letterSpacing: '-0.025em', color: theme.ink, lineHeight: 1 }}>
              {provisional.total}
            </span>
            <span style={{ color: theme.inkMuted, fontSize: 13.5 }}>
              {t(`/ 100 · ${provisional.band}`, `/ 100 · ${provisional.band === 'low' ? '初步' : provisional.band === 'mid' ? '中段' : '靠前'}`)}
            </span>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { label: t('Evidence', '证据'),       v: provisional.metrics.evidence,    max: 40, c: A.yellow },
              { label: t('Recommenders', '推荐人'),  v: provisional.metrics.recommenders, max: 30, c: A.mint },
              { label: t('Readiness', '准备状态'),   v: provisional.metrics.readiness,   max: 30, c: A.violet },
            ].map(m => (
              <div key={m.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bullet color={m.c} size={9} />
                    <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 13.5, color: theme.ink, letterSpacing: '-0.005em' }}>{m.label}</span>
                  </div>
                  <span style={{ fontFamily: 'Geist', fontSize: 12.5, color: theme.inkMuted }}>
                    <strong style={{ color: theme.ink, fontWeight: 600 }}>{m.v}</strong> / {m.max}
                  </span>
                </div>
                <div style={{ height: 3, background: theme.hairlineFaint, position: 'relative', borderRadius: 2 }}>
                  <div style={{ position: 'absolute', inset: 0, right: 'auto', width: `${Math.min(100, (m.v/m.max)*100)}%`, background: m.c, borderRadius: 2 }} />
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

window.QuizScreen = QuizScreen;

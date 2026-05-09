/* global React, Bullet, useNav, useLang, useAnswers, QUESTIONS, SECTION_LABELS, MFrame, MTopBar, MBtn, MEyebrow, MHeader, PALETTE */
// Mobile readiness analysis — renders the production QUESTIONS dynamically.
// Single question per page, mobile card style, with progress and section eyebrow.

const M_QUIZ_T = {
  topbar:    { en: 'Readiness analysis', zh: '准备度分析' },
  back:      { en: 'Back',     zh: '返回' },
  prev:      { en: 'Previous', zh: '上一题' },
  next:      { en: 'Continue', zh: '继续' },
  see:       { en: 'See results', zh: '查看结果' },
  pickUpTo:  { en: (n) => `Pick up to ${n}.`, zh: (n) => `最多可选 ${n} 项。` },
  note_lbl:  { en: 'How this is used', zh: '我们如何使用这些回答' },
  note_body: {
    en: 'Answers feed the diagnostic only. Candidacy will tell you what your evidence pattern looks like — not what to do about it. Prescription belongs to the paid Candidacy.',
    zh: '回答仅用于诊断层。Candidacy 会告诉你证据结构的样貌——不告诉你该怎么做。处方属于付费 Candidacy。',
  },
  questionN: { en: (n, total) => `Question ${n} of ${total}`, zh: (n, total) => `第 ${n} 题 / 共 ${total} 题` },
  selected:  { en: 'Selected', zh: '已选' },
};

// Section accent colours — match the desktop section bullets.
const SECTION_COLOURS = ['#D99DCF', '#F3D24A', '#A8DDB4', '#B4A9E7']; // pink, yellow, mint, violet
// Option dot palette (cycled per question).
const OPT_PALETTE = ['#D99DCF', '#E5B487', '#9BD3CE', '#F3D24A', '#C58DD2', '#A8DDB4', '#A7CFF5', '#B4A9E7', '#B68994'];

function MQuizScreen({ theme }) {
  const A = theme.brand;
  const { go } = useNav();
  const { lang } = useLang();
  const { answers, setAnswer, toggleMulti, step, setStep } = useAnswers();
  const t = (k, ...args) => {
    const v = M_QUIZ_T[k];
    if (!v) return k;
    const fn = v[lang] || v.en;
    return typeof fn === 'function' ? fn(...args) : fn;
  };

  const total = QUESTIONS.length;
  const current = Math.min(Math.max(step, 0), total - 1);
  const question = QUESTIONS[current];
  const options = question.getOptions ? question.getOptions(answers) : (question.options || []);
  const value = answers[question.id];
  const sectionLabel = SECTION_LABELS[lang === 'zh' ? 'zh' : 'en'][question.section];
  const sectionColour = SECTION_COLOURS[question.section] || A;

  const isAnswered = question.type === 'multi'
    ? Array.isArray(value) && value.length > 0
    : value != null && value !== '';

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
  function pickMulti(key)  { toggleMulti(question.id, key, question.maxSelect, question.exclusiveOption); }

  const stepNum = current + 1;
  const pct = Math.round((stepNum / total) * 100);

  return (
    <MFrame theme={theme}>
      {/* Top-bar arrow escapes one level (to onboarding); the inline Prev
          button below walks Q-by-Q. Matches the up-a-level pattern used by
          every other mobile screen. */}
      <MTopBar theme={theme} showBack onBack={() => go('onboarding')} title={t('topbar')} />

      {/* Progress */}
      <div style={{ padding: '0 18px', marginTop: 12 }}>
        <div style={{ height: 3, background: theme.hairlineFaint, borderRadius: 999 }}>
          <div style={{ width: `${pct}%`, height: '100%', background: A, borderRadius: 999, transition: 'width 0.2s' }} />
        </div>
        <div style={{
          marginTop: 8, fontSize: 11, color: theme.inkMuted, fontFamily: 'Geist',
          letterSpacing: '0.04em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Bullet color={sectionColour} size={7} />
          <span>{t('questionN', stepNum, total)} · {sectionLabel}</span>
        </div>
      </div>

      <div style={{ padding: '18px 18px 28px' }}>
        <MHeader theme={theme} size={22}>
          {question.title[lang] || question.title.en}
        </MHeader>
        {question.desc && (
          <p style={{ margin: '14px 0 4px', fontSize: 13, lineHeight: 1.55, color: theme.inkMuted, textWrap: 'pretty' }}>
            {question.desc[lang] || question.desc.en}
          </p>
        )}
        {question.maxSelect && (
          <p style={{ margin: '4px 0 14px', fontSize: 11.5, color: theme.inkFaint, fontStyle: 'italic' }}>
            {t('pickUpTo', question.maxSelect)}
          </p>
        )}

        <div style={{ display: 'grid', gap: 8, marginTop: question.maxSelect ? 4 : 18 }}>
          {options.map((opt, i) => {
            const display = opt.labels[lang] || opt.labels.en;
            const isSel = question.type === 'multi'
              ? Array.isArray(value) && value.includes(opt.id)
              : value === opt.id;
            const dotColor = OPT_PALETTE[i % OPT_PALETTE.length];
            return (
              <button key={opt.id}
                onClick={() => question.type === 'multi' ? pickMulti(opt.id) : pickSingle(opt.id)}
                style={{
                  appearance: 'none', textAlign: 'left', cursor: 'pointer',
                  border: `1.5px solid ${isSel ? A : theme.hairlineFaint}`,
                  borderRadius: 12, background: isSel ? A + '08' : theme.bg,
                  padding: '13px 14px',
                  display: 'grid', gridTemplateColumns: '14px 1fr 16px', gap: 10, alignItems: 'center',
                  transition: 'all 0.12s ease',
                }}>
                <Bullet color={dotColor} size={9} />
                <span style={{
                  fontFamily: 'Geist', fontSize: 13.5, color: theme.ink, lineHeight: 1.4,
                }}>{display}</span>
                <div style={{
                  width: 16, height: 16, borderRadius: 999,
                  border: `1.5px solid ${isSel ? A : theme.hairline}`,
                  background: isSel ? A : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSel && (
                    question.type === 'multi'
                      ? <svg width="9" height="7" viewBox="0 0 10 8"><path d="M1 4 L4 7 L9 1" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <span style={{ width: 6, height: 6, borderRadius: 999, background: '#fff' }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Compliance note */}
        <div style={{
          marginTop: 18, padding: 13, borderRadius: 10,
          background: theme.surface || theme.hairlineFaint + '40',
          border: `1px solid ${theme.hairlineFaint}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <Bullet color={A} size={7} />
            <span style={{ fontFamily: 'Geist', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.inkMuted }}>
              {t('note_lbl')}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: theme.inkMuted }}>{t('note_body')}</p>
        </div>

        {/* Equal-width row, both with button shape — matches the desktop
            quiz pattern (secondary outline + primary fill). Avoids the
            ghost-vs-fill weight mismatch. */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <MBtn theme={theme} onClick={prev}>
            ‹ {current === 0 ? t('back') : t('prev')}
          </MBtn>
          <MBtn theme={theme} variant="primary" onClick={next} style={{
            opacity: isAnswered ? 1 : 0.45, pointerEvents: isAnswered ? 'auto' : 'none',
          }}>
            {current === total - 1 ? t('see') : t('next')} →
          </MBtn>
        </div>
      </div>
    </MFrame>
  );
}

window.MQuizScreen = MQuizScreen;

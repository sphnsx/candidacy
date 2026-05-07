/* global React, Bullet, useNav, useLang, PALETTE */
// Mobile primitives — Candidacy. EN/ZH aware, compliance-safe copy.
// Adapted from design handoff. Sized for native mobile viewports
// (no iOS-simulator paddings — that was for the design canvas).

const M_W = 375;

// ─── i18n helpers ────────────────────────────────────────────────
const M_STRINGS = {
  brand:      { en: 'Candidacy', zh: 'Candidacy' },
  free:       { en: 'Free', zh: '免费' },
  paid:       { en: 'Paid', zh: '付费' },
  back:       { en: 'Back', zh: '返回' },
  menu:       { en: 'Menu', zh: '菜单' },
  disclaimer: {
    en: 'Information analysis based on published criteria. Candidacy is not a law firm or visa agency. No lawyer-client or adviser-client relationship is created. We do not provide regulated immigration advice within the meaning of the Immigration and Asylum Act 1999.',
    zh: 'Candidacy 提供基于公开标准的信息整理与分析，不是律师事务所，也不是签证代办，不构成律师/顾问与客户的法律关系。本服务不提供 Immigration and Asylum Act 1999 范围内的受监管移民法律建议。',
  },
  rights:     { en: '© 2026 Candidacy', zh: '© 2026 Candidacy' },
  privacy:    { en: 'Privacy', zh: '隐私' },
  terms:      { en: 'Terms', zh: '条款' },
  changelog:  { en: 'Changelog', zh: '更新日志' },
  status:     { en: 'Beta · under iteration', zh: 'Beta · 持续迭代中' },
};
function mt(key, lang) {
  const v = M_STRINGS[key];
  return v ? (v[lang] || v.en) : key;
}

// ─── Frame ───────────────────────────────────────────────────────
// In production this fills the viewport; not a fake iPhone window.
function MFrame({ theme, children }) {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: theme.bg,
      color: theme.ink,
      fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: '-0.005em',
      position: 'relative',
    }}>{children}</div>
  );
}

// ─── Top app bar ─────────────────────────────────────────────────
function MTopBar({ theme, title, showBack, onBack }) {
  const { go } = useNav();
  const { lang, setLang } = useLang();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px',
      background: theme.bg,
      borderBottom: `1px solid ${theme.hairlineFaint}`,
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      {showBack ? (
        <button onClick={onBack} aria-label="Back" style={{
          appearance: 'none', border: 'none', background: 'transparent', padding: 0,
          fontSize: 22, color: theme.ink, cursor: 'pointer', fontFamily: 'Geist',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>‹</button>
      ) : (
        <a onClick={() => go('landing')}
           style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Bullet color={theme.brand} size={11} />
          <span style={{ fontFamily: 'Geist', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em', color: theme.ink }}>Candidacy</span>
        </a>
      )}
      {title && <span style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 13, color: theme.ink, letterSpacing: '-0.01em' }}>{title}</span>}
      <div style={{
        display: 'flex', borderRadius: 999, padding: 2,
        background: theme.surface || theme.hairlineFaint,
        fontFamily: 'Geist', fontSize: 11, fontWeight: 600,
      }}>
        {['en','zh'].map(l => (
          <button key={l} onClick={() => setLang(l)} aria-label={l === 'en' ? 'English' : '中文'} style={{
            appearance: 'none', border: 'none', cursor: 'pointer',
            padding: '5px 9px', borderRadius: 999,
            background: lang === l ? theme.bg : 'transparent',
            color: lang === l ? theme.ink : theme.inkMuted,
            boxShadow: lang === l ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            letterSpacing: '0.02em',
          }}>{l === 'en' ? 'EN' : '中'}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Footer (compliance disclaimer) ──────────────────────────────
function MFooter({ theme }) {
  const { lang } = useLang();
  return (
    <div style={{
      borderTop: `1px solid ${theme.hairlineFaint}`,
      padding: '20px 18px 28px',
      background: theme.surface || theme.bg,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Bullet color={theme.brand} size={10} />
        <span style={{ fontFamily: 'Geist', fontWeight: 700, fontSize: 13, color: theme.ink }}>Candidacy</span>
      </div>
      <p style={{
        margin: '0 0 12px', fontSize: 10.5, lineHeight: 1.55,
        color: theme.inkMuted, letterSpacing: '-0.005em',
      }}>{mt('disclaimer', lang)}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: theme.inkMuted }}>
        <span>{mt('rights', lang)}</span>
        <span>{mt('status', lang)}</span>
      </div>
    </div>
  );
}

// ─── Button ──────────────────────────────────────────────────────
function MBtn({ children, onClick, variant = 'secondary', theme, fullWidth = false, style }) {
  const primary = variant === 'primary';
  const ghost = variant === 'ghost';
  return (
    <button onClick={onClick} style={{
      appearance: 'none',
      borderRadius: 999,
      border: primary || ghost ? 'none' : `1px solid ${theme.hairline}`,
      background: primary ? theme.brand : 'transparent',
      color: primary ? '#fff' : theme.ink,
      fontFamily: 'Geist, sans-serif', fontSize: 14.5, fontWeight: 600,
      padding: '13px 22px', cursor: 'pointer',
      letterSpacing: '-0.01em',
      width: fullWidth ? '100%' : 'auto', minHeight: 48,
      ...style,
    }}>{children}</button>
  );
}

// ─── Eyebrow ─────────────────────────────────────────────────────
function MEyebrow({ theme, color, children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <Bullet color={color} size={9} />
      <span style={{
        fontFamily: 'Geist', fontWeight: 500, fontSize: 11, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: theme.inkMuted,
      }}>{children}</span>
    </div>
  );
}

function MHeader({ theme, size = 28, children, color }) {
  return (
    <h2 style={{
      fontFamily: theme.serif || '"Source Serif 4","Source Serif Pro",Georgia,serif',
      fontWeight: 400, fontSize: size, letterSpacing: '-0.022em',
      color: color || theme.ink, margin: 0, lineHeight: 1.05, textWrap: 'balance',
    }}>{children}</h2>
  );
}

function MStatus({ kind, theme, label }) {
  const { lang } = useLang();
  const map = {
    solid:    { c: PALETTE.mint,     label: { en: 'Solid', zh: '稳' } },
    partial:  { c: PALETTE.yellow,   label: { en: 'Partial', zh: '部分' } },
    gap:      { c: PALETTE.mauve,    label: { en: 'Gap', zh: '缺口' } },
    risk:     { c: PALETTE.tan,      label: { en: 'Risk flag', zh: '风险' } },
    excluded: { c: PALETTE.charcoal, label: { en: 'Excluded', zh: '排除' } },
    free:     { c: PALETTE.mint,     label: { en: 'Free', zh: '免费' } },
    locked:   { c: PALETTE.charcoal, label: { en: 'Locked', zh: '未解锁' } },
  }[kind] || { c: PALETTE.grey, label: { en: kind, zh: kind } };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11.5, fontFamily: 'Geist', fontWeight: 500, color: theme.ink,
    }}>
      <Bullet color={map.c} size={8} />{label || map.label[lang] || map.label.en}
    </span>
  );
}

// Lock icon — used by paid-tier teasers to mark gated items.
function MLock({ theme, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke={theme.inkMuted} strokeWidth="1.2" />
      <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke={theme.inkMuted} strokeWidth="1.2" />
    </svg>
  );
}

Object.assign(window, {
  MFrame, MTopBar, MFooter, MBtn, MEyebrow, MHeader, MStatus, MLock,
  M_W, mt, M_STRINGS,
});

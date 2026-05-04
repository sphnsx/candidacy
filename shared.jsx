/* global React */
// Design system — blue-primary, pastel accents, mind-map layout motif.

// Palette pulled from the uploaded swatches.
const PALETTE = {
  // row 1
  teal:   '#9BD3CE',
  sky:    '#A7CFF5',
  yellow: '#F3D24A',
  tan:    '#E5B487',
  pink:   '#D99DCF',
  blue:   '#3B90F2',  // PRIMARY
  grey:   '#DCDCDE',
  // row 2
  mint:   '#A8DDB4',
  lilac:  '#C58DD2',
  cream:  '#E9D3A6',
  violet: '#B4A9E7',
  mauve:  '#B68994',
  charcoal: '#6A6A6A',
  ink:    '#1A1A1A',
};

const THEMES = {
  light: {
    name: 'Light',
    bg: '#FFFFFF',
    surface: '#F5F6F8',
    ink: '#0F1114',
    inkMuted: '#5A5E66',
    inkFaint: '#A0A4AB',
    hairline: '#0F1114',
    hairlineFaint: 'rgba(15,17,20,0.10)',
    connector: 'rgba(15,17,20,0.20)',
    brand: PALETTE.blue,
    accent: PALETTE,
  },
  warm: {
    name: 'Warm',
    bg: '#FAF6EE',
    surface: '#FFFFFF',
    ink: '#141210',
    inkMuted: '#585450',
    inkFaint: '#9A948C',
    hairline: '#141210',
    hairlineFaint: 'rgba(20,18,16,0.12)',
    connector: 'rgba(20,18,16,0.22)',
    brand: PALETTE.blue,
    accent: PALETTE,
  },
  dark: {
    name: 'Dark',
    bg: '#0E1116',
    surface: '#161A20',
    ink: '#EEF1F5',
    inkMuted: '#A2A8B0',
    inkFaint: '#5E6670',
    hairline: '#EEF1F5',
    hairlineFaint: 'rgba(238,241,245,0.14)',
    connector: 'rgba(238,241,245,0.22)',
    brand: '#5AA3FF',
    accent: PALETTE,
  },
};

// ─── PRIMITIVES ────────────────────────────────────────────────────────────

// Solid colored dot — mind-map node marker.
function Bullet({ color, size = 12, ring, style }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 4px ${ring}` : 'none',
      ...style,
    }} />
  );
}

// Compact labeled bullet — dot + bold text (+ optional sub)
function BulletItem({ color, children, size = 12, sub, theme, style }) {
  return (
    <div style={{ display: 'flex', alignItems: sub ? 'flex-start' : 'center', gap: 12, ...style }}>
      <Bullet color={color} size={size} style={{ marginTop: sub ? 7 : 0 }} />
      <div>
        <div style={{
          fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: '-0.01em',
          color: theme?.ink || '#0F1114',
          lineHeight: 1.3,
        }}>{children}</div>
        {sub && <div style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: 13.5,
          fontWeight: 400,
          color: theme?.inkMuted || '#5A5E66',
          marginTop: 3,
          lineHeight: 1.5,
        }}>{sub}</div>}
      </div>
    </div>
  );
}

// Colored section header — serif, like Claude's editorial titles.
function ColorHeader({ color, size = 36, children, style, sans = false }) {
  return (
    <h2 style={{
      fontFamily: sans
        ? 'Geist, sans-serif'
        : '"Source Serif 4", "Source Serif Pro", Georgia, serif',
      fontWeight: sans ? 600 : 400,
      fontSize: size,
      letterSpacing: sans ? '-0.028em' : '-0.02em',
      color,
      margin: 0,
      lineHeight: 1.05,
      ...style,
    }}>{children}</h2>
  );
}

// Small labeled chip — outlined, with leading dot.
function Chip({ children, color, theme, filled = false, style }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      borderRadius: 999,
      background: filled ? color : theme.bg,
      border: `1px solid ${filled ? color : theme.hairlineFaint}`,
      color: filled ? theme.ink : theme.ink,
      fontFamily: 'Geist, sans-serif',
      fontSize: 12.5,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      lineHeight: 1.3,
      ...style,
    }}>
      {!filled && color && <Bullet color={color} size={8} />}
      {children}
    </span>
  );
}

// Button — flat. Primary = blue fill. Secondary = outlined ink.
function Btn({ children, onClick, variant = 'secondary', theme, color, style }) {
  const primary = variant === 'primary';
  const accent = variant === 'accent';
  const bg = primary ? theme.brand : accent ? (color || theme.brand) : 'transparent';
  const fg = primary ? '#fff' : accent ? theme.ink : theme.ink;
  const border = variant === 'secondary' ? `1px solid ${theme.hairline}` : 'none';
  return (
    <button onClick={onClick} style={{
      appearance: 'none',
      borderRadius: 999,
      border,
      background: bg,
      color: fg,
      fontFamily: 'Geist, sans-serif',
      fontSize: 14.5,
      fontWeight: 600,
      padding: '12px 22px',
      cursor: 'pointer',
      letterSpacing: '-0.01em',
      ...style,
    }}>{children}</button>
  );
}

function Rule({ theme, style }) {
  return <div style={{ height: 0, borderTop: `1px solid ${theme.hairlineFaint}`, ...style }} />;
}

// Frame
function Frame({ theme, width = 1280, children }) {
  return (
    <div style={{
      width,
      background: theme.bg,
      color: theme.ink,
      fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontSize: 15,
      lineHeight: 1.55,
      letterSpacing: '-0.005em',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

// ─── NAV CONTEXT ───────────────────────────────────────────────────────────
// Lets any child fire navigation without prop drilling.
const NavContext = React.createContext({ go: () => {}, current: 'landing', signedIn: false });
function useNav() { return React.useContext(NavContext); }

// ─── LANG CONTEXT ──────────────────────────────────────────────────────────
const LangContext = React.createContext({ lang: 'en', setLang: () => {} });
function useLang() { return React.useContext(LangContext); }
// Inline translator: t('English', '中文'). Strings live next to their JSX.
function useT() {
  const { lang } = useLang();
  return (en, zh) => (lang === 'zh' ? (zh ?? en) : en);
}

// Top nav — clean, blue-primary, click-through.
function TopNav({ theme, active = 'home' }) {
  const { go, signedIn } = useNav();
  const { lang, setLang } = useLang();
  const t = useT();
  // MVP scope: Candidacy Scan only. Other layers hidden until built.
  const items = [
    { id: 'home',      to: 'landing', label: t('Overview', '概览') },
    { id: 'check',     to: 'quiz',    label: t('Readiness check', '准备度评估') },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '18px 56px',
      borderBottom: `1px solid ${theme.hairlineFaint}`,
      background: theme.bg,
    }}>
      <a onClick={() => go(signedIn ? 'dashboard' : 'landing')}
         style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 40, cursor: 'pointer', textDecoration: 'none' }}>
        <Bullet color={theme.brand} size={14} />
        <span style={{ fontFamily: 'Geist', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: theme.ink }}>
          Candidacy
        </span>
      </a>
      <nav style={{ display: 'flex', gap: 26, flex: 1 }}>
        {items.map(i => {
          const isActive = i.id === active;
          return (
            <a key={i.id} onClick={() => go(i.to)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Geist, sans-serif',
              fontSize: 14.5,
              fontWeight: isActive ? 600 : 500,
              letterSpacing: '-0.01em',
              color: isActive ? theme.ink : theme.inkMuted,
              cursor: 'pointer',
              textDecoration: 'none',
              position: 'relative',
              paddingBottom: 2,
              borderBottom: isActive ? `1.5px solid ${theme.brand}` : '1.5px solid transparent',
            }}>
              {isActive && <Bullet color={theme.brand} size={7} />}
              {i.label}
            </a>
          );
        })}
      </nav>
      <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} style={{
        appearance: 'none', border: `1px solid ${theme.hairlineFaint}`, background: 'transparent',
        color: theme.inkMuted, fontFamily: 'Geist, sans-serif', fontSize: 12.5, fontWeight: 500,
        letterSpacing: '-0.005em', padding: '6px 11px', borderRadius: 999, cursor: 'pointer',
        marginRight: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
      }} aria-label="Toggle language">
        <span style={{ color: lang === 'en' ? theme.ink : theme.inkFaint, fontWeight: lang === 'en' ? 600 : 500 }}>EN</span>
        <span style={{ color: theme.inkFaint }}>·</span>
        <span style={{ color: lang === 'zh' ? theme.ink : theme.inkFaint, fontWeight: lang === 'zh' ? 600 : 500 }}>中文</span>
      </button>
      <Btn variant="primary" theme={theme} onClick={() => go('onboarding')} style={{ padding: '9px 16px', fontSize: 13.5 }}>{t('Get started', '开始使用')}</Btn>
    </div>
  );
}

function Footer({ theme }) {
  const t = useT();
  return (
    <div style={{
      padding: '36px 56px 44px',
      borderTop: `1px solid ${theme.hairlineFaint}`,
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 40,
      fontSize: 13,
      color: theme.inkMuted,
      background: theme.bg,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Bullet color={theme.brand} size={12} />
          <span style={{ fontFamily: 'Geist', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em', color: theme.ink }}>Candidacy</span>
        </div>
        <p style={{ margin: 0, maxWidth: 460, lineHeight: 1.6 }}>
          {t(
            'Structured information analysis for UK Global Talent Visa (Arts & Culture) preparation. Not a law firm, visa agency, or immigration adviser.',
            '面向英国 Global Talent 签证（艺术与文化方向）申请准备的结构化信息分析。不是律师事务所，不是签证代办，也不是受监管的移民顾问。'
          )}
        </p>
      </div>
      <div>
        <div style={{ fontWeight: 600, color: theme.ink, marginBottom: 10 }}>{t('Monitored sources', '监测来源')}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
          <li>Home Office</li>
          <li>Arts Council England</li>
          <li>{t('Endorsing bodies & partners', 'Endorsing body 与合作机构')}</li>
        </ul>
      </div>
      <div>
        <div style={{ fontWeight: 600, color: theme.ink, marginBottom: 10 }}>{t('Updated', '更新于')}</div>
        <div>{t('24 Apr 2026', '2026 年 4 月 24 日')}</div>
      </div>
    </div>
  );
}

// ─── MIND MAP PRIMITIVES ───────────────────────────────────────────────────

// A single mind-map node: colored dot + label. Positioned absolutely by caller.
function MMNode({ x, y, color, size = 14, label, sub, theme, align = 'left', anchor = 'start', highlight = false }) {
  const labelStyle = {
    fontFamily: 'Geist, sans-serif',
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: '-0.01em',
    color: theme.ink,
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
  };
  const subStyle = {
    fontFamily: 'Geist, sans-serif',
    fontSize: 12.5,
    color: theme.inkMuted,
    marginTop: 2,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
  };
  // anchor: start = label to the right of dot; end = label to the left
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(${anchor === 'end' ? '-100%' : '0'}, -50%)`,
      display: 'flex',
      flexDirection: anchor === 'end' ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: 10,
      textAlign: anchor === 'end' ? 'right' : 'left',
    }}>
      <Bullet color={color} size={size} ring={highlight ? `${color}33` : undefined} />
      <div>
        <div style={labelStyle}>{label}</div>
        {sub && <div style={subStyle}>{sub}</div>}
      </div>
    </div>
  );
}

// Central hub node for mind map
function MMHub({ x, y, label, size = 20, theme, color }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
    }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: color || theme.brand,
        boxShadow: `0 0 0 8px ${(color || theme.brand) + '22'}`,
      }} />
      {label && (
        <div style={{
          fontFamily: 'Geist, sans-serif',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '-0.02em',
          color: theme.ink,
          textAlign: 'center',
          maxWidth: 220,
          lineHeight: 1.2,
        }}>{label}</div>
      )}
    </div>
  );
}

// Draws a connector line between two points via SVG path.
// Style: 'curved' (Bezier), 'straight' (line), 'orth' (right-angle elbow).
function MMLine({ x1, y1, x2, y2, color, dashed = false, width = 1, style }) {
  // Default to global tweak if no style passed
  const effectiveStyle = style || window.__CANDIDACY_CONNECTOR_STYLE || 'curved';
  let d;
  if (effectiveStyle === 'straight') {
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
  } else if (effectiveStyle === 'orth') {
    const midX = (x1 + x2) / 2;
    d = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
  } else {
    const midX = (x1 + x2) / 2;
    d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  }
  return (
    <path d={d}
      stroke={color}
      strokeWidth={width}
      fill="none"
      strokeDasharray={dashed ? '4 4' : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

// Wrapper for a mind-map scene. Takes explicit width/height and absolutely-positions children.
function MindMap({ width, height, theme, children, bg }) {
  return (
    <div style={{
      position: 'relative',
      width, height,
      background: bg || 'transparent',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

// Status pill — small bullet + label, used in tables and lists.
function Status({ kind, theme }) {
  const t = useT();
  const map = {
    solid:    { c: PALETTE.mint,   label: t('Solid', '稳健') },
    partial:  { c: PALETTE.yellow, label: t('Partial', '部分') },
    gap:      { c: PALETTE.mauve,  label: t('Gap', '缺口') },
    excluded: { c: PALETTE.charcoal, label: t('Excluded', '不计入') },
    draft:    { c: PALETTE.sky,    label: t('Draft', '草稿') },
    received: { c: PALETTE.mint,   label: t('Received', '已收到') },
    pending:  { c: PALETTE.yellow, label: t('Pending', '进行中') },
    requested:{ c: PALETTE.tan,    label: t('Requested', '已请求') },
  }[kind] || { c: PALETTE.grey, label: kind };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontFamily: 'Geist', fontWeight: 500, color: theme.ink }}>
      <Bullet color={map.c} size={9} />{map.label}
    </span>
  );
}

Object.assign(window, {
  PALETTE, THEMES,
  Bullet, BulletItem, ColorHeader, Chip, Btn, Rule, Frame, TopNav, Footer, Status,
  MMNode, MMHub, MMLine, MindMap,
  NavContext, useNav,
  LangContext, useLang, useT,
});

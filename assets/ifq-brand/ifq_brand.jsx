/**
 * IFQ Brand Components · React + inline JSX
 * ------------------------------------------
 * Drop-in components that weave ifq.ai into any deliverable as authored ambience.
 * Import pattern (single-file HTML, Babel standalone):
 *
 *   <script type="text/babel">
 *     // paste this entire file into your <script>, or Read it with the Read tool
 *     // and inline the contents before your own components.
 *   </script>
 *
 * Exports (in global scope of the <script>):
 *   - IfqLogo         · Wordmark SVG "ifq.ai"
 *   - IfqSpark        · Animated 8-point sparkle (drop into any hero)
 *   - IfqWatermark    · Quiet authored corner signal
 *   - IfqStamp        · Editorial field-note stamp for slide / infographic / closing footers
 *   - resolveIfqYear  · Resolve the authored year from a creation date or current date
 *   - IfqHandDrawnIcon · Reference one of the 24 hand-drawn icons by id
 *   - IfqBrand        · Design tokens (colors, type, radii) you can spread into style
 *
 * Philosophy: NEVER substitute CSS-drawn shapes for the real logo in prominent
 * positions. For IFQ-owned prominent placements (hero, header, stamp), prefer
 * <img src="assets/ifq-brand/logo.svg"/> over CSS re-implementation.
 * These components exist for inline / animated / interactive contexts where
 * IFQ should feel woven in rather than pasted on.
 */

const IfqBrand = {
  // Rust accent inherited from the editorial IFQ system
  accent: '#D4532B',
  accentDeep: '#A83518',
  accentSoft: '#FFB27A',
  ink: '#111111',
  paper: '#FAF7F2',
  radius: { sm: 6, md: 10, lg: 14 },
  type: {
    display: "'Newsreader', 'Source Serif Pro', 'Noto Serif SC', Georgia, serif",
    body: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
  },
};

function normalizeIfqDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function resolveIfqCreationDate(explicitDate) {
  const direct = normalizeIfqDate(explicitDate);
  if (direct) {
    return direct;
  }

  if (typeof window !== 'undefined') {
    const globalDate = normalizeIfqDate(window.IFQ_CREATION_DATE);
    if (globalDate) {
      return globalDate;
    }

    if (typeof document !== 'undefined') {
      const rootDate = normalizeIfqDate(document.documentElement.getAttribute('data-ifq-created-at'));
      if (rootDate) {
        return rootDate;
      }

      const metaTag = document.querySelector('meta[name="ifq:created-at"]');
      const metaDate = normalizeIfqDate(metaTag && metaTag.getAttribute('content'));
      if (metaDate) {
        return metaDate;
      }
    }
  }

  return new Date();
}

function resolveIfqYear(explicitDate) {
  return resolveIfqCreationDate(explicitDate).getFullYear();
}

function resolveIfqColophon(explicitDate) {
  return `ifq.ai / ${resolveIfqYear(explicitDate)}`;
}

function IfqLogo({ height = 28, variant = 'light', style }) {
  // variant: 'light' (dark text on light bg) | 'dark' (light text on dark bg)
  const inkColor = variant === 'dark' ? IfqBrand.paper : IfqBrand.ink;
  const accent = variant === 'dark' ? IfqBrand.accentSoft : IfqBrand.accent;
  return (
    <svg
      viewBox="0 0 220 80"
      height={height}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      role="img"
      aria-label="ifq.ai"
    >
      <g transform="translate(32 14)" fill={accent}>
        <path d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2 Z" />
      </g>
      <text x="18" y="62" fontSize="56" fontFamily={IfqBrand.type.display}
            fontWeight="900" letterSpacing="-2" fill={inkColor}>ifq</text>
      <text x="128" y="62" fontSize="56" fontFamily={IfqBrand.type.display}
            fontWeight="900" letterSpacing="-1" fill={accent}>.ai</text>
    </svg>
  );
}

function IfqSpark({ size = 64, duration = 3200, style }) {
  // Animated 8-point sparkle — rotates + pulses
  const id = React.useMemo(() => 'ifqSpark-' + Math.random().toString(36).slice(2, 8), []);
  return (
    <span style={{ display: 'inline-block', width: size, height: size, ...style }}>
      <style>{`
        @keyframes ${id}-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ${id}-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.85; } }
        .${id}-outer { animation: ${id}-spin ${duration}ms linear infinite; transform-origin: 50% 50%; }
        .${id}-inner { animation: ${id}-pulse ${duration / 2}ms ease-in-out infinite; transform-origin: 50% 50%; }
      `}</style>
      <svg viewBox="-12 -12 24 24" width={size} height={size}>
        <defs>
          <linearGradient id={id + '-grad'} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={IfqBrand.accentSoft} />
            <stop offset="1" stopColor={IfqBrand.accentDeep} />
          </linearGradient>
        </defs>
        <g className={id + '-outer'}>
          <g className={id + '-inner'}>
            <path
              d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2 Z"
              fill={`url(#${id}-grad)`}
            />
          </g>
        </g>
      </svg>
    </span>
  );
}

function IfqWatermark({ position = 'bottom-right', opacity = 0.55, scale = 1 }) {
  // Quiet corner signal. Use as authored presence, not loud watermarking.
  const pos = {
    'bottom-right': { bottom: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 },
    'top-right': { top: 16, right: 16 },
    'top-left': { top: 16, left: 16 },
  }[position] || { bottom: 16, right: 16 };
  return (
    <div style={{
      position: 'absolute',
      ...pos,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      opacity,
      fontSize: 11 * scale,
      fontFamily: IfqBrand.type.mono,
      letterSpacing: 0.8,
      color: IfqBrand.ink,
      pointerEvents: 'none',
      mixBlendMode: 'multiply',
    }}>
      <svg viewBox="-12 -12 24 24" width={12 * scale} height={12 * scale}>
        <path d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2 Z"
              fill={IfqBrand.accent} />
      </svg>
      <span><b style={{ color: IfqBrand.accent }}>ifq.ai</b> / signal</span>
    </div>
  );
}

function IfqStamp({ label, createdAt, theme = 'light' }) {
  // Editorial rectangular stamp — good for slide footers / infographic colophon
  const bg = theme === 'dark' ? '#151515' : '#fff';
  const fg = theme === 'dark' ? IfqBrand.paper : IfqBrand.ink;
  const resolvedLabel = label || resolveIfqColophon(createdAt);
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 12px',
      background: bg,
      color: fg,
      border: `1.5px solid ${IfqBrand.accent}`,
      borderRadius: 2,
      fontFamily: IfqBrand.type.mono,
      fontSize: 11,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    }}>
      <svg viewBox="-12 -12 24 24" width={14} height={14}>
        <path d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2 Z"
              fill={IfqBrand.accent} />
      </svg>
      <span>{resolvedLabel}</span>
    </div>
  );
}

function IfqHandDrawnIcon({ id, size = 20, color = 'currentColor', style }) {
  // id ∈ { spark, brush, pencil, frame, layers, play, record, film, deck, grid,
  //        palette, eyedropper, type, serif, cursor, hand, sparkles, radar,
  //        compass, idea, rocket, check, link, arrow }
  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'inline-block', verticalAlign: 'middle', stroke: color, fill: 'none', ...style }}
      aria-hidden="true"
    >
      <use href={`assets/ifq-brand/icons/hand-drawn-icons.svg#i-${id}`} />
    </svg>
  );
}

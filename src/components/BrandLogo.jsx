import React from 'react';

/**
 * BrandLogo - Clean, 2D-refined vector logo for DOOM OTT with matte muted gold accent.
 * Replaces the glossy/chrome neon glare with a modern, flat, cinematic mark.
 */
export default function BrandLogo({ size = 'medium', showText = true, className = '', onClick }) {
  // Dimension scales
  const dimensions = {
    small: { iconSize: 28, fontSize: '1.15rem', badgeSize: '0.65rem' },
    medium: { iconSize: 36, fontSize: '1.45rem', badgeSize: '0.72rem' },
    large: { iconSize: 48, fontSize: '1.9rem', badgeSize: '0.85rem' },
    hero: { iconSize: 64, fontSize: '2.4rem', badgeSize: '0.95rem' },
  }[size] || { iconSize: 36, fontSize: '1.45rem', badgeSize: '0.72rem' };

  return (
    <div 
      className={`brand-logo-container ${className}`} 
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.7rem',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
    >
      {/* Matte Gold Monogram Emblem */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Rounded Hex / Shield Outline */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="22"
          fill="#0E0E0E"
          stroke="url(#matteGoldBorder)"
          strokeWidth="3.5"
        />

        {/* Minimal D / Media Play Shape */}
        <path
          d="M32 26 H52 C65 26 73 34 73 50 C73 66 65 74 52 74 H32 V26 Z M44 38 V62 H51 C58 62 61 57 61 50 C61 43 58 38 51 38 H44 Z"
          fill="url(#matteGoldFill)"
        />

        {/* Subtle Play Triangle Accent inside D */}
        <path
          d="M48 44 L56 50 L48 56 Z"
          fill="#0E0E0E"
        />

        {/* Gradients - Muted matte gold, no neon sheen */}
        <defs>
          <linearGradient id="matteGoldFill" x1="32" y1="26" x2="73" y2="74" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5C378" />
            <stop offset="0.6" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#C5A059" />
          </linearGradient>

          <linearGradient id="matteGoldBorder" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5C378" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="1" stopColor="#9A7B38" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Typography: DOOM OTT */}
      {showText && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: dimensions.fontSize,
              letterSpacing: '0.04em',
              color: '#FFFFFF'
            }}
          >
            DOOM
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: dimensions.badgeSize,
              letterSpacing: '0.14em',
              padding: '0.2rem 0.45rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(212, 175, 55, 0.16)',
              color: '#D4AF37',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              textTransform: 'uppercase'
            }}
          >
            OTT
          </span>
        </div>
      )}
    </div>
  );
}

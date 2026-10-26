import React from 'react';

export const CheckIcon: React.FC<{size?: number; color?: string; stroke?: number}> = ({size = 28, color = '#fff', stroke = 3.2}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{flex: 'none'}}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

/** Renders text, replacing every "✓" with a drawn check icon (so it never depends on font glyph support). */
export const WithChecks: React.FC<{text: string; size: number; color: string}> = ({text, size, color}) => (
  <>
    {text.split('✓').flatMap((part, i, arr) => [
      part,
      i < arr.length - 1 ? (
        <span key={i} style={{display: 'inline-block', verticalAlign: 'middle', margin: '0 0.18em', transform: 'translateY(-0.04em)'}}>
          <CheckIcon size={size * 0.95} color={color} />
        </span>
      ) : null,
    ])}
  </>
);

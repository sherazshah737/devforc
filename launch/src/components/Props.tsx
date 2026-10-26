import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors} from '../config';

/** Compass / watch dial. */
const Dial: React.FC<{size: number; style: React.CSSProperties; speed?: number}> = ({size, style, speed = 1}) => {
  const frame = useCurrentFrame();
  const ticks = Array.from({length: 60}, (_, i) => i);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{position: 'absolute', opacity: 0.32, ...style}}>
      <circle cx="100" cy="100" r="96" fill="none" stroke={colors.ink} strokeWidth="5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke={colors.ink} strokeWidth="1.5" />
      {ticks.map((i) => (
        <line key={i} x1="100" y1="20" x2="100" y2={i % 5 === 0 ? 34 : 27} stroke={colors.ink} strokeWidth={i % 5 === 0 ? 3 : 1.4} transform={`rotate(${i * 6} 100 100)`} />
      ))}
      <polygon points="100,52 108,100 100,148 92,100" fill={colors.orange} transform={`rotate(${35 + frame * 0.4 * speed} 100 100)`} />
      <line x1="100" y1="100" x2="100" y2="48" stroke={colors.ink} strokeWidth="4" strokeLinecap="round" transform={`rotate(${frame * 0.8 * speed} 100 100)`} />
      <circle cx="100" cy="100" r="7" fill={colors.ink} />
    </svg>
  );
};

/** Simple pencil lying along the left edge, with a pencil line trailing from its tip. */
const Pencil: React.FC = () => (
  <svg width="120" height="760" viewBox="0 0 120 760" style={{position: 'absolute', left: -46, top: 520, opacity: 0.5}}>
    <g transform="rotate(-7 60 380)">
      <rect x="40" y="40" width="40" height="560" fill="#F2B33D" stroke={colors.ink} strokeWidth="3" />
      <rect x="40" y="40" width="40" height="46" fill="#D98A8A" stroke={colors.ink} strokeWidth="3" />
      <rect x="40" y="86" width="40" height="18" fill="#B8B8B8" stroke={colors.ink} strokeWidth="3" />
      <line x1="60" y1="104" x2="60" y2="600" stroke="rgba(28,28,28,0.18)" strokeWidth="3" />
      <polygon points="40,600 80,600 60,668" fill="#F1D7B5" stroke={colors.ink} strokeWidth="3" />
      <polygon points="52,646 68,646 60,668" fill={colors.ink} />
    </g>
  </svg>
);

/** Decorative props for light scenes: dial top-left + bottom-right, pencil on the left edge. */
export const Props: React.FC = () => (
  <>
    <Dial size={330} style={{left: -120, top: -110}} />
    <Dial size={400} style={{right: -150, bottom: -130}} speed={-0.7} />
    <Pencil />
  </>
);

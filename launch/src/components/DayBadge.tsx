import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {mono} from '../fonts';

/** Orange pill badge: "Day 01" */
export const DayBadge: React.FC<{text: string; at: number; size?: number; style?: React.CSSProperties}> = ({text, at, size = 40, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 14, stiffness: 160}});
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.4,
        padding: `${size * 0.32}px ${size * 0.8}px`,
        borderRadius: 999,
        background: `linear-gradient(90deg, ${colors.orange}, ${colors.orangeDeep})`,
        color: colors.white,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: 2,
        boxShadow: '0 12px 30px rgba(232,93,12,0.35)',
        transform: `scale(${0.5 + 0.5 * p})`,
        opacity: Math.min(1, p * 2),
        transformOrigin: 'left center',
        ...style,
      }}
    >
      <span style={{width: size * 0.3, height: size * 0.3, borderRadius: '50%', background: colors.white}} />
      {text}
    </div>
  );
};

import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';

const S = 240;

/** Black (left, knob) and orange (right, socket) puzzle pieces that slide together and snap. */
export const PuzzlePieces: React.FC<{at: number; scale?: number}> = ({at, scale = 1.7}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 9, stiffness: 120, mass: 0.8}});
  const snap = spring({frame: frame - at - 24, fps, config: {damping: 8, stiffness: 260}});
  const pulse = 1 + 0.06 * Math.sin(Math.min(1, Math.max(0, snap)) * Math.PI);
  return (
    <div style={{position: 'relative', width: S * 2 * scale, height: S * scale, transform: `scale(${pulse})`}}>
      <svg
        width={(S + 70) * scale}
        height={S * scale}
        viewBox={`0 0 ${S + 70} ${S}`}
        style={{position: 'absolute', left: 0, top: 0, zIndex: 2, transform: `translateX(${(p - 1) * 560}px) rotate(${(1 - p) * -14}deg)`, filter: 'drop-shadow(0 24px 30px rgba(0,0,0,0.3))'}}
      >
        <rect x="0" y="0" width={S} height={S} rx="14" fill="#161616" />
        <rect x={S - 6} y="98" width="42" height="44" fill="#161616" />
        <circle cx={S + 30} cy="120" r="40" fill="#161616" />
        <rect x="14" y="14" width="212" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      </svg>
      <svg
        width={S * scale}
        height={S * scale}
        viewBox={`0 0 ${S} ${S}`}
        style={{position: 'absolute', left: S * scale, top: 0, transform: `translateX(${(1 - p) * 560}px) rotate(${(1 - p) * 14}deg)`, filter: 'drop-shadow(0 24px 30px rgba(232,93,12,0.35))'}}
      >
        <defs>
          <linearGradient id="pz-or" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={colors.orange} />
            <stop offset="1" stopColor={colors.orangeDeep} />
          </linearGradient>
          <mask id="pz-mask">
            <rect width={S} height={S} rx="14" fill="#fff" />
            <rect x="-10" y="98" width="42" height="44" fill="#000" />
            <circle cx="30" cy="120" r="40" fill="#000" />
          </mask>
        </defs>
        <rect width={S} height={S} rx="14" fill="url(#pz-or)" mask="url(#pz-mask)" />
      </svg>
    </div>
  );
};

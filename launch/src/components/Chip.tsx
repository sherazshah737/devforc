import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {inter} from '../fonts';
import {CheckIcon} from './Glyphs';

/** White pill chip with an orange check, pops in. */
export const Chip: React.FC<{text: string; at: number; size?: number}> = ({text, at, size = 44}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 11, stiffness: 190}});
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 20,
        padding: `${size * 0.34}px ${size * 0.7}px ${size * 0.34}px ${size * 0.4}px`,
        borderRadius: 999,
        background: colors.white,
        boxShadow: '0 14px 34px rgba(80,40,10,0.18)',
        fontFamily: inter,
        fontWeight: 700,
        fontSize: size,
        color: colors.ink,
        opacity: Math.min(1, p * 2.5),
        transform: `scale(${0.5 + 0.5 * p}) translateX(${(1 - p) * -60}px)`,
        transformOrigin: 'left center',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{width: size * 1.05, height: size * 1.05, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.orange}, ${colors.orangeDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
        <CheckIcon size={size * 0.62} />
      </span>
      {text}
    </div>
  );
};

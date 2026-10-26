import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {inter} from '../fonts';
import {CheckIcon} from './Glyphs';

/** List item that pops in with an orange check circle. */
export const CheckItem: React.FC<{text: string; at: number; size?: number}> = ({text, at, size = 50}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 11, stiffness: 190}});
  const ring = spring({frame: frame - at - 4, fps, config: {damping: 9, stiffness: 220}});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 28, opacity: Math.min(1, p * 2.5), transform: `scale(${0.6 + 0.4 * p}) translateX(${(1 - p) * -40}px)`, transformOrigin: 'left center'}}>
      <div
        style={{
          width: size * 1.1,
          height: size * 1.1,
          borderRadius: '50%',
          flex: 'none',
          background: `linear-gradient(135deg, ${colors.orange}, ${colors.orangeDeep})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${0.4 + 0.6 * ring})`,
          boxShadow: '0 8px 20px rgba(232,93,12,0.35)',
        }}
      >
        <CheckIcon size={size * 0.62} />
      </div>
      <span style={{fontFamily: inter, fontWeight: 600, fontSize: size, color: colors.ink}}>{text}</span>
    </div>
  );
};

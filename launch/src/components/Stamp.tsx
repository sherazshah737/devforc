import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {inter} from '../fonts';
import {WithChecks} from './Glyphs';

/** Orange outlined rubber stamp that rotates/slams in. */
export const Stamp: React.FC<{text: string; at: number}> = ({text, at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 10, stiffness: 200, mass: 0.7}});
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '22px 46px',
        border: `9px solid ${colors.orange}`,
        borderRadius: 24,
        color: colors.orange,
        fontFamily: inter,
        fontWeight: 900,
        fontSize: 64,
        letterSpacing: 3,
        textTransform: 'uppercase',
        background: 'rgba(247,220,196,0.55)',
        opacity: Math.min(1, p * 3),
        transform: `rotate(${-14 + (1 - p) * -40}deg) scale(${2.4 - 1.4 * p})`,
        boxShadow: `inset 0 0 0 3px rgba(240,122,26,0.4)`,
        whiteSpace: 'nowrap',
      }}
    >
      <WithChecks text={text} size={64} color={colors.orange} />
    </div>
  );
};

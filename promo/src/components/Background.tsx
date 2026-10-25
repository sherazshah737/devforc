import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors, Tone} from '../config';
import {StarBurst} from './StarBurst';

export type Corner = 'tl' | 'tr' | 'bl' | 'br';

const cornerStyle = (c: Corner, size: number): React.CSSProperties => {
  const off = -size * 0.52;
  return {
    top: c[0] === 't' ? off : undefined,
    bottom: c[0] === 'b' ? off : undefined,
    left: c[1] === 'l' ? off : undefined,
    right: c[1] === 'r' ? off : undefined,
  };
};

const STREAKS = [
  {left: -180, width: 220, alpha: 0.5, speed: 0.35},
  {left: 260, width: 120, alpha: 0.35, speed: -0.25},
  {left: 640, width: 300, alpha: 0.42, speed: 0.3},
  {left: 980, width: 140, alpha: 0.3, speed: -0.4},
];

/** Soft gray gradient (light) or solid burgundy, with faint diagonal light streaks and corner starbursts. */
export const Background: React.FC<{tone: Tone; corners?: Corner[]}> = ({tone, corners = ['tr', 'bl']}) => {
  const frame = useCurrentFrame();
  const light = tone === 'light';
  return (
    <AbsoluteFill
      style={{
        background: light
          ? `linear-gradient(160deg, ${colors.grayLight} 0%, ${colors.grayMid} 100%)`
          : colors.burgundy,
        overflow: 'hidden',
      }}
    >
      {STREAKS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: -400,
            left: s.left + frame * s.speed,
            width: s.width,
            height: 2800,
            transform: 'rotate(28deg)',
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${
              light ? s.alpha : s.alpha * 0.16
            }), transparent)`,
          }}
        />
      ))}
      {corners.map((c, i) => {
        const size = i === 0 ? 560 : 440;
        return (
          <StarBurst
            key={c}
            size={size}
            color={light ? colors.burgundy : colors.offWhite}
            opacity={light ? 0.9 : 0.85}
            speed={i % 2 === 0 ? 5 : -4}
            phase={i * 11}
            style={cornerStyle(c, size)}
          />
        );
      })}
    </AbsoluteFill>
  );
};

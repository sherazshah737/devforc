import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../config';
import {mono} from '../fonts';

/** "Uploading products" bar: 0% → 100% with a mono percentage. */
export const ProgressBar: React.FC<{label: string; from: number; to: number; width?: number}> = ({label, from, to, width = 880}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const appear = interpolate(frame, [from - 12, from], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{width, opacity: appear, transform: `translateY(${(1 - appear) * 30}px)`}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontWeight: 700, fontSize: 32, color: colors.ink, marginBottom: 18}}>
        <span>{label}</span>
        <span style={{color: colors.orange}}>{Math.round(p * 100)}%</span>
      </div>
      <div style={{height: 26, borderRadius: 13, background: 'rgba(28,28,28,0.13)', overflow: 'hidden'}}>
        <div style={{height: '100%', width: `${p * 100}%`, borderRadius: 13, background: `linear-gradient(90deg, ${colors.orange}, ${colors.orangeDeep})`}} />
      </div>
    </div>
  );
};

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../config';
import {inter} from '../fonts';
import {typed} from '../lib/anim';

/** White comment input bar: types the keyword, then the send button pulses. Frames are scene-relative. */
export const CommentBar: React.FC<{keyword: string; at: number; typingAt: number; sendAt: number; width?: number}> = ({keyword, at, typingAt, sendAt, width = 940}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const text = typed(keyword, frame, typingAt, 8);
  const done = text.length === keyword.length;
  const pulsing = frame >= sendAt;
  const beat = pulsing ? (frame - sendAt) % 30 : 0;
  const scale = pulsing ? 1 + 0.16 * Math.sin((beat / 30) * Math.PI) : 1;
  const ring = beat / 30;
  return (
    <div
      style={{
        width,
        height: 132,
        borderRadius: 66,
        background: colors.white,
        boxShadow: '0 24px 60px rgba(80,40,10,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '0 20px 0 24px',
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
        fontFamily: inter,
      }}
    >
      <div style={{width: 84, height: 84, borderRadius: 42, flex: 'none', background: colors.ink}} />
      <div style={{flex: 1, fontSize: 50, fontWeight: 600, color: text ? colors.ink : '#A9A29C', whiteSpace: 'nowrap'}}>
        {text || 'Add a comment…'}
        {text && (
          <span style={{display: 'inline-block', width: 4, height: 54, marginLeft: 4, transform: 'translateY(8px)', background: Math.floor(frame / 12) % 2 === 0 || !done ? colors.orange : 'transparent'}} />
        )}
      </div>
      <div style={{position: 'relative', width: 92, height: 92, flex: 'none'}}>
        {pulsing && <div style={{position: 'absolute', inset: 0, borderRadius: 46, border: `4px solid ${colors.orange}`, opacity: 1 - ring, transform: `scale(${1 + ring * 0.8})`}} />}
        <div style={{position: 'absolute', inset: 0, borderRadius: 46, background: `linear-gradient(135deg, ${colors.orange}, ${colors.orangeDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})`, opacity: text ? 1 : 0.5}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

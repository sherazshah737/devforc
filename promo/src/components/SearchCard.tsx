import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors} from '../config';
import {fontFamily} from '../fonts';
import {progress} from '../lib/anim';

/** Search card: types `query`, then reveals "No results found" + gray placeholder lines. All frames are scene-relative. */
export const SearchCard: React.FC<{
  query: string;
  noResults: string;
  at: number;
  typingAt: number;
  resultsAt: number;
  charFrames?: number;
  width?: number;
}> = ({query, noResults, at, typingAt, resultsAt, charFrames = 2.2, width = 900}) => {
  const frame = useCurrentFrame();
  const cardP = progress(frame, at, 18);
  const chars = Math.max(0, Math.min(query.length, Math.floor((frame - typingAt) / charFrames)));
  const typed = query.slice(0, chars);
  const caretOn = Math.floor(frame / 12) % 2 === 0 || chars < query.length;
  const resP = progress(frame, resultsAt, 16);

  return (
    <div
      style={{
        width,
        borderRadius: 40,
        background: colors.white,
        boxShadow: '0 40px 90px rgba(60,10,20,0.22)',
        padding: 40,
        opacity: cardP,
        filter: cardP < 1 ? `blur(${(1 - cardP) * 12}px)` : undefined,
        transform: `translateY(${(1 - cardP) * 50}px)`,
        fontFamily,
        fontStyle: 'italic',
      }}
    >
      <div
        style={{
          height: 104,
          borderRadius: 52,
          border: '3px solid #E3DFDE',
          boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 36px',
          gap: 22,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={colors.grayDark} strokeWidth="2.6" strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M16 16l5 5" />
        </svg>
        <div style={{fontSize: 46, color: colors.ink, whiteSpace: 'nowrap'}}>
          {typed}
          <span
            style={{
              display: 'inline-block',
              width: 3,
              height: 50,
              marginLeft: 4,
              transform: 'translateY(8px)',
              background: caretOn ? colors.burgundy : 'transparent',
            }}
          />
        </div>
      </div>

      <div style={{height: 360, paddingTop: 42, opacity: resP, transform: `translateY(${(1 - resP) * 20}px)`}}>
        <div style={{fontSize: 62, fontWeight: 700, color: colors.burgundy, marginBottom: 34}}>{noResults}</div>
        {[0.92, 0.7, 0.82, 0.5].map((w, i) => (
          <div
            key={i}
            style={{
              height: 26,
              width: `${w * 100}%`,
              borderRadius: 13,
              background: '#E7E3E2',
              marginBottom: 24,
            }}
          />
        ))}
      </div>
    </div>
  );
};

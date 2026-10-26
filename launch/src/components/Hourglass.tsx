import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors} from '../config';

const GLASS =
  'M62,50 H238 C238,150 176,212 160,250 L160,270 C176,308 238,370 238,470 H62 C62,370 124,308 140,270 L140,250 C124,212 62,150 62,50 Z';

/**
 * Illustrated hourglass: wooden frame, glass, golden sand draining top → bottom.
 * `from`/`to` are the frames (in the scene) where draining starts and ends.
 */
export const Hourglass: React.FC<{from: number; to: number; width?: number}> = ({from, to, width = 360}) => {
  const frame = useCurrentFrame();
  const p = Math.max(0, Math.min(1, (frame - from) / (to - from)));
  const topLevel = 62 + p * 185; // sand surface in the upper bulb
  const mound = 470 - p * 190; // peak of sand in the lower bulb
  const falling = p > 0 && p < 1;
  return (
    <svg width={width} height={(width * 520) / 300} viewBox="0 0 300 520" style={{overflow: 'visible', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.55))'}}>
      <defs>
        <linearGradient id="hg-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B5793F" />
          <stop offset="1" stopColor="#6E4420" />
        </linearGradient>
        <linearGradient id="hg-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD36B" />
          <stop offset="1" stopColor={colors.sand} />
        </linearGradient>
        <linearGradient id="hg-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>
        <clipPath id="hg-clip">
          <path d={GLASS} />
        </clipPath>
      </defs>

      {/* posts */}
      <rect x="34" y="36" width="16" height="448" rx="6" fill="url(#hg-wood)" />
      <rect x="250" y="36" width="16" height="448" rx="6" fill="url(#hg-wood)" />

      {/* glass + sand */}
      <path d={GLASS} fill="url(#hg-glass)" />
      <g clipPath="url(#hg-clip)">
        {/* upper sand (funnel dips toward the surface) */}
        <rect x="50" y={topLevel} width="200" height={260 - topLevel} fill="url(#hg-sand)" />
        {/* lower pile */}
        <polygon points={`50,480 150,${mound} 250,480`} fill="url(#hg-sand)" />
        {falling && <rect x="148.5" y="250" width="3" height={mound - 250} fill={colors.sand} />}
      </g>
      <path d={GLASS} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="4" />
      <path d="M82,70 C84,130 118,180 138,214" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="5" strokeLinecap="round" />

      {/* plates */}
      <rect x="16" y="8" width="268" height="34" rx="10" fill="url(#hg-wood)" />
      <rect x="16" y="478" width="268" height="34" rx="10" fill="url(#hg-wood)" />
      <rect x="22" y="14" width="256" height="6" rx="3" fill="rgba(255,220,170,0.35)" />
      <rect x="22" y="484" width="256" height="6" rx="3" fill="rgba(255,220,170,0.35)" />
    </svg>
  );
};

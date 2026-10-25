import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors, Tone, usd} from '../config';
import {fontFamily} from '../fonts';
import {progress} from '../lib/anim';

/** Huge bold-italic number that blurs in while counting up from zero. */
export const BigNumber: React.FC<{
  value: number;
  at: number;
  tone?: Tone;
  size?: number;
  countFrames?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({value, at, tone = 'light', size = 230, countFrames = 36, suffix = '', style}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, 18);
  const c = progress(frame, at, countFrames);
  const settle = progress(frame, at + countFrames, 14);
  const scale = 1 + 0.06 * Math.sin(settle * Math.PI);
  return (
    <div
      style={{
        fontFamily,
        fontStyle: 'italic',
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        color: tone === 'light' ? colors.burgundy : colors.white,
        opacity: p,
        filter: p < 1 ? `blur(${(1 - p) * 14}px)` : undefined,
        transform: `translateY(${(1 - p) * 30}px) scale(${scale})`,
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {usd(value * c)}
      {suffix}
    </div>
  );
};

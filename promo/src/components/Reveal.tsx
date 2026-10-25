import React from 'react';
import {useCurrentFrame} from 'remotion';
import {progress} from '../lib/anim';

/** Blur-in + fade + upward drift for any element, starting at `at` (frame in the current scene). */
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  drift?: number;
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at, dur = 18, drift = 24, blur = 12, style, children}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, dur);
  return (
    <div
      style={{
        opacity: p,
        filter: p < 1 ? `blur(${(1 - p) * blur}px)` : undefined,
        transform: `translateY(${(1 - p) * drift}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

import React from 'react';
import {useCurrentFrame} from 'remotion';
import {progress} from '../lib/anim';

/** Slide-up + fade (+ optional blur) for any element, starting at frame `at` of the current scene. */
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  drift?: number;
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at, dur = 16, drift = 40, blur = 6, style, children}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, dur);
  return (
    <div
      style={{
        opacity: p,
        filter: p < 1 && blur ? `blur(${(1 - p) * blur}px)` : undefined,
        transform: `translateY(${(1 - p) * drift}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

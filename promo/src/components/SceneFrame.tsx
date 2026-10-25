import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FPS, Tone, transitionSeconds} from '../config';
import {Background, Corner} from './Background';

export const TRANSITION_FRAMES = Math.round(transitionSeconds * FPS);

/**
 * Every scene sits on top of the previous one (the previous Sequence is extended by
 * TRANSITION_FRAMES), so fading the new scene in = crossfade; its content also un-blurs.
 */
export const SceneFrame: React.FC<{
  tone: Tone;
  corners?: Corner[];
  first?: boolean;
  children: React.ReactNode;
}> = ({tone, corners, first, children}) => {
  const frame = useCurrentFrame();
  const t = first ? 1 : interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: t}}>
        <Background tone={tone} corners={corners} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: t, filter: t < 1 ? `blur(${(1 - t) * 16}px)` : undefined}}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, FPS, Tone, transitionSeconds} from '../config';
import {BgWord} from './BgWord';
import {Props} from './Props';
import {StepDots} from './StepDots';

export const TRANSITION_FRAMES = Math.round(transitionSeconds * FPS);

const GRID = 'rgba(28,28,28,0.055)';

export const Background: React.FC<{tone: Tone; bgWord?: string}> = ({tone, bgWord}) => {
  if (tone === 'dark') {
    return (
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, ${colors.darkCenter} 0%, ${colors.darkEdge} 78%)`}} />
    );
  }
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.peach1} 0%, ${colors.peach2} 100%)`,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${GRID} 2px, transparent 2px), linear-gradient(90deg, ${GRID} 2px, transparent 2px)`,
          backgroundSize: '90px 90px',
        }}
      />
      {bgWord && <BgWord word={bgWord} />}
      <Props />
    </AbsoluteFill>
  );
};

/** White flash used for the "4 DAYS" / "LIVE" reveals. `at` is a frame inside the scene. */
export const Flash: React.FC<{at: number; color?: string}> = ({at, color = '#FFFFFF'}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 2, at + 9], [0, 0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0) return null;
  return <AbsoluteFill style={{background: color, opacity: o, zIndex: 50}} />;
};

/**
 * Each scene is mounted on top of the previous one (whose Sequence is extended by TRANSITION_FRAMES),
 * so fading it in is the crossfade; its content also un-blurs slightly.
 */
export const SceneFrame: React.FC<{
  tone: Tone;
  step?: number;
  bgWord?: string;
  first?: boolean;
  children: React.ReactNode;
}> = ({tone, step, bgWord, first, children}) => {
  const frame = useCurrentFrame();
  const t = first ? 1 : interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: t}}>
        <Background tone={tone} bgWord={bgWord} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: t, filter: t < 1 ? `blur(${(1 - t) * 10}px)` : undefined}}>
        {step ? <StepDots active={step} tone={tone} /> : null}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

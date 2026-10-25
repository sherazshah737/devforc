import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {Logo} from '../components/Logo';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s13;

export const Scene13Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - 4, fps, config: {damping: 16, stiffness: 100}});
  return (
    <SceneFrame tone={s.tone} corners={['tl', 'br']}>
      <AbsoluteFill style={{top: 430, alignItems: 'center'}}>
        <Reveal at={4} dur={20} blur={14}>
          <div style={{transform: `scale(${0.85 + 0.15 * pop})`}}>
            <Logo width={780} />
          </div>
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill style={{top: 1130}}>
        <BlurWords lines={s.lines} tone={s.tone} size={74} delay={sec(s.cues.text)} lineGap={4} emphScale={1.3} />
      </AbsoluteFill>
    </SceneFrame>
  );
};

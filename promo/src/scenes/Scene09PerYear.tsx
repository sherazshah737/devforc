import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BigNumber} from '../components/BigNumber';
import {BlurWords} from '../components/BlurWords';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s9;

export const Scene09PerYear: React.FC = () => (
  <SceneFrame tone={s.tone}>
    <AbsoluteFill style={{top: 520}}>
      <BlurWords lines={s.lines} tone={s.tone} size={84} delay={6} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 700, alignItems: 'center'}}>
      <BigNumber value={s.result.value} at={sec(s.result.at)} tone={s.tone} size={230} suffix="." countFrames={34} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 1080}}>
      <BlurWords lines={[s.after]} tone={s.tone} size={70} delay={sec(s.cues.after)} emphScale={1.25} emphWeight={900} />
    </AbsoluteFill>
  </SceneFrame>
);

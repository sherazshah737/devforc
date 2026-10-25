import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';

const s = scenes.s7;

export const Scene07OneDay: React.FC = () => (
  <SceneFrame tone={s.tone}>
    <AbsoluteFill style={{justifyContent: 'center'}}>
      <BlurWords lines={s.lines} tone={s.tone} size={72} delay={6} lineGap={6} emphScale={1.35} />
    </AbsoluteFill>
  </SceneFrame>
);

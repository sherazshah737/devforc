import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';

const s = scenes.s2;

export const Scene02Truth: React.FC = () => (
  <SceneFrame tone={s.tone} corners={['tl', 'br']}>
    <AbsoluteFill style={{justifyContent: 'center'}}>
      <BlurWords lines={s.lines} tone={s.tone} size={84} delay={6} lineGap={6} emphScale={1.3} emphWeight={900} />
    </AbsoluteFill>
  </SceneFrame>
);

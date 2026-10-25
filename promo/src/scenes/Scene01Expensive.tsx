import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {PriceTag} from '../components/Illustrations';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s1;

export const Scene01Expensive: React.FC = () => (
  <SceneFrame tone={s.tone} first>
    <AbsoluteFill style={{justifyContent: 'center', paddingBottom: 260}}>
      <BlurWords lines={s.lines} tone={s.tone} size={74} delay={4} lineGap={4} emphScale={1.55} />
    </AbsoluteFill>
    <PriceTag text={s.tagText} at={sec(s.cues.tag)} />
  </SceneFrame>
);

import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {Person} from '../components/Illustrations';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s6;

export const Scene06WorstPart: React.FC = () => (
  <SceneFrame tone={s.tone} corners={['tl', 'br']}>
    <AbsoluteFill style={{top: 250}}>
      <BlurWords
        lines={s.lines}
        tone={s.tone}
        size={76}
        emphScale={1.15}
        lineStarts={[6, sec(s.cues.second)]}
        style={{gap: 10}}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 1060, alignItems: 'center'}}>
      <Person at={sec(s.cues.person)} />
    </AbsoluteFill>
  </SceneFrame>
);

import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {SceneFrame} from '../components/SceneFrame';
import {scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s11;

export const Scene11NotJust: React.FC = () => (
  <SceneFrame tone={s.tone} corners={['tl', 'br']}>
    <AbsoluteFill style={{justifyContent: 'center'}}>
      <BlurWords
        lines={s.lines}
        tone={s.tone}
        size={76}
        emphScale={1.5}
        emphWeight={900}
        lineStarts={[6, sec(s.cues.second)]}
        style={{gap: 24}}
      />
    </AbsoluteFill>
  </SceneFrame>
);

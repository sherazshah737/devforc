import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {CommentBar} from '../components/Illustrations';
import {SceneFrame} from '../components/SceneFrame';
import {brand, scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s12;

export const Scene12Comment: React.FC = () => (
  <SceneFrame tone={s.tone}>
    <AbsoluteFill style={{top: 190}}>
      <BlurWords lines={[s.comment]} tone={s.tone} size={96} delay={6} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 330}}>
      <BlurWords lines={[`*"${brand.commentKeyword}"*`]} tone={s.tone} size={136} emphScale={1} emphWeight={900} delay={sec(s.cues.keyword)} stagger={6} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 650}}>
      <BlurWords lines={s.lines} tone={s.tone} size={62} delay={sec(s.cues.rest)} lineGap={3} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 940}}>
      <BlurWords lines={[s.free]} tone={s.tone} size={72} emphScale={1.35} emphWeight={900} delay={sec(s.cues.free)} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 1560, alignItems: 'center'}}>
      <CommentBar keyword={brand.commentKeyword} at={sec(s.cues.free)} typingAt={sec(s.cues.typing)} sendAt={sec(s.cues.send)} />
    </AbsoluteFill>
  </SceneFrame>
);

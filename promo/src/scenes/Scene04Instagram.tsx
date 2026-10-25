import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {ChatCard} from '../components/ChatCard';
import {SceneFrame} from '../components/SceneFrame';
import {brand, scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s4;

export const Scene04Instagram: React.FC = () => (
  <SceneFrame tone={s.tone} corners={['tl', 'br']}>
    <AbsoluteFill style={{top: 230}}>
      <BlurWords lines={s.lines} tone={s.tone} size={66} delay={4} stagger={3} lineGap={3} emphScale={1.4} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 1000, alignItems: 'center'}}>
      <ChatCard
        handle={brand.chatHandle}
        at={sec(s.cues.card)}
        messages={[
          {from: 'user', text: s.userMessage, at: sec(s.cues.user)},
          {from: 'biz', text: s.reply, at: sec(s.cues.reply)},
        ]}
      />
    </AbsoluteFill>
  </SceneFrame>
);

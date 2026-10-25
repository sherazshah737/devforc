import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {BrowserMockup} from '../components/BrowserMockup';
import {StoreScreen} from '../components/MockScreens';
import {SceneFrame} from '../components/SceneFrame';
import {brand, scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s5;

export const Scene05Competitor: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slide = spring({frame: frame - sec(s.cues.browser), fps, config: {damping: 18, stiffness: 70}});
  return (
    <SceneFrame tone={s.tone}>
      <AbsoluteFill style={{top: 150}}>
        <BlurWords lines={[`*${s.big}*`]} tone={s.tone} size={140} emphScale={1.3} emphWeight={900} delay={6} />
      </AbsoluteFill>
      <AbsoluteFill style={{top: 470}}>
        <BlurWords lines={s.lines} tone={s.tone} size={62} delay={sec(s.cues.text)} lineGap={4} emphScale={1.4} />
      </AbsoluteFill>
      <AbsoluteFill style={{top: 880, alignItems: 'center'}}>
        <div style={{transform: `translateY(${(1 - slide) * 1200}px)`}}>
          <BrowserMockup url={brand.competitorUrl} width={900} height={920}>
            <StoreScreen banner={s.banner} products={s.products} />
          </BrowserMockup>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};

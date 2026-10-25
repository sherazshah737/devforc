import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BigNumber} from '../components/BigNumber';
import {BlurWords} from '../components/BlurWords';
import {DollarStack} from '../components/Illustrations';
import {SceneFrame} from '../components/SceneFrame';
import {colors, scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s8;

export const Scene08Math: React.FC = () => {
  const frame = useCurrentFrame();
  const barAt = sec(s.result.at) - 8;
  const bar = interpolate(frame, [barAt, barAt + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneFrame tone={s.tone} corners={['tl', 'br']}>
      <AbsoluteFill style={{top: 200}}>
        <BlurWords lines={[s.title]} tone={s.tone} size={84} emphScale={1.1} emphWeight={900} delay={6} />
      </AbsoluteFill>
      <AbsoluteFill style={{top: 430}}>
        <BlurWords
          lines={s.build.map((b) => b.text)}
          tone={s.tone}
          size={88}
          emphScale={1}
          lineStarts={s.build.map((b) => sec(b.at))}
        />
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 790,
          left: 270,
          width: 540 * bar,
          height: 6,
          borderRadius: 3,
          background: colors.burgundy,
        }}
      />
      <AbsoluteFill style={{top: 830, alignItems: 'center'}}>
        <BigNumber value={s.result.value} at={sec(s.result.at)} size={250} />
      </AbsoluteFill>
      <AbsoluteFill style={{top: 1440, alignItems: 'center'}}>
        <DollarStack at={sec(s.cues.bills)} />
      </AbsoluteFill>
    </SceneFrame>
  );
};

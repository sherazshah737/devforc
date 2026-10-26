import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Logo} from '../components/Logo';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {colors, scenes} from '../config';
import {mono} from '../fonts';
import {sec} from '../lib/anim';

const s = scenes.s8;

export const Scene8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: frame - sec(s.cues.logo), fps, config: {damping: 14, stiffness: 100}});
  return (
    <SceneFrame tone={s.tone}>
      <AbsoluteFill style={{top: 600, alignItems: 'center'}}>
        <Reveal at={sec(s.cues.logo)} dur={20}>
          <div style={{transform: `scale(${0.85 + 0.15 * pop})`}}>
            <Logo width={800} />
          </div>
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill style={{top: 1230, alignItems: 'center'}}>
        <Reveal at={sec(s.cues.tag)} drift={16} blur={0}>
          <div style={{fontFamily: mono, fontWeight: 700, fontSize: 40, color: colors.grayDark, letterSpacing: 2}}>{s.tag}</div>
        </Reveal>
      </AbsoluteFill>
    </SceneFrame>
  );
};

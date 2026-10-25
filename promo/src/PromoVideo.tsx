import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {TRANSITION_FRAMES} from './components/SceneFrame';
import {FPS, TOTAL_FRAMES, musicVolume, scenes} from './config';
import './fonts';
import {useAssetExists} from './lib/assets';
import {Scene01Expensive} from './scenes/Scene01Expensive';
import {Scene02Truth} from './scenes/Scene02Truth';
import {Scene03Search} from './scenes/Scene03Search';
import {Scene04Instagram} from './scenes/Scene04Instagram';
import {Scene05Competitor} from './scenes/Scene05Competitor';
import {Scene06WorstPart} from './scenes/Scene06WorstPart';
import {Scene07OneDay} from './scenes/Scene07OneDay';
import {Scene08Math} from './scenes/Scene08Math';
import {Scene09PerYear} from './scenes/Scene09PerYear';
import {Scene10ThreeThings} from './scenes/Scene10ThreeThings';
import {Scene11NotJust} from './scenes/Scene11NotJust';
import {Scene12Comment} from './scenes/Scene12Comment';
import {Scene13Outro} from './scenes/Scene13Outro';

const order = [
  [scenes.s1, Scene01Expensive],
  [scenes.s2, Scene02Truth],
  [scenes.s3, Scene03Search],
  [scenes.s4, Scene04Instagram],
  [scenes.s5, Scene05Competitor],
  [scenes.s6, Scene06WorstPart],
  [scenes.s7, Scene07OneDay],
  [scenes.s8, Scene08Math],
  [scenes.s9, Scene09PerYear],
  [scenes.s10, Scene10ThreeThings],
  [scenes.s11, Scene11NotJust],
  [scenes.s12, Scene12Comment],
  [scenes.s13, Scene13Outro],
] as const;

const Music: React.FC = () => {
  const exists = useAssetExists('music.mp3', 'audio');
  if (!exists) return null;
  const fade = FPS * 1.5;
  return (
    <Audio
      src={staticFile('music.mp3')}
      volume={(f) =>
        musicVolume * interpolate(f, [0, fade, TOTAL_FRAMES - fade, TOTAL_FRAMES], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      }
    />
  );
};

export const PromoVideo: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {order.map(([cfg, Component], i) => {
      const from = Math.round(cfg.start * FPS);
      const last = i === order.length - 1;
      // each scene stays mounted under the next one while it fades in (the crossfade)
      const duration = Math.round((cfg.end - cfg.start) * FPS) + (last ? 0 : TRANSITION_FRAMES);
      return (
        <Sequence key={i} from={from} durationInFrames={duration} name={`Scene ${i + 1}`}>
          <Component />
        </Sequence>
      );
    })}
    <Music />
  </AbsoluteFill>
);

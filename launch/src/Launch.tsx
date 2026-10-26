import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {TRANSITION_FRAMES} from './components/SceneFrame';
import {FPS, TOTAL_FRAMES, musicVolume, scenes, sfxCues, sfxVolume, voiceVolume} from './config';
import './fonts';
import {useAssetExists} from './lib/assets';
import {Scene1Hourglass} from './scenes/Scene1Hourglass';
import {Scene2Design} from './scenes/Scene2Design';
import {Scene3Build} from './scenes/Scene3Build';
import {Scene4Setup} from './scenes/Scene4Setup';
import {Scene5Live} from './scenes/Scene5Live';
import {Scene6Puzzle} from './scenes/Scene6Puzzle';
import {Scene7Launch} from './scenes/Scene7Launch';
import {Scene8Outro} from './scenes/Scene8Outro';

const order = [
  [scenes.s1, Scene1Hourglass],
  [scenes.s2, Scene2Design],
  [scenes.s3, Scene3Build],
  [scenes.s4, Scene4Setup],
  [scenes.s5, Scene5Live],
  [scenes.s6, Scene6Puzzle],
  [scenes.s7, Scene7Launch],
  [scenes.s8, Scene8Outro],
] as const;

/** Plays /public/<path> from `from` (frames) if the file exists. */
const OptionalAudio: React.FC<{path: string; from: number; volume: number}> = ({path, from, volume}) => {
  const exists = useAssetExists(path, 'audio');
  if (!exists) return null;
  return (
    <Sequence from={from}>
      <Audio src={staticFile(path)} volume={volume} />
    </Sequence>
  );
};

const Music: React.FC = () => {
  const exists = useAssetExists('music.mp3', 'audio');
  if (!exists) return null;
  const fade = FPS * 1.5;
  return (
    <Audio
      src={staticFile('music.mp3')}
      volume={(f) => musicVolume * interpolate(f, [0, fade, TOTAL_FRAMES - fade, TOTAL_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
    />
  );
};

export const Launch: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {order.map(([cfg, Component], i) => {
      const from = Math.round(cfg.start * FPS);
      const last = i === order.length - 1;
      // each scene stays mounted under the next one while that one fades in (the crossfade)
      const duration = Math.round((cfg.end - cfg.start) * FPS) + (last ? 0 : TRANSITION_FRAMES);
      return (
        <Sequence key={i} from={from} durationInFrames={duration} name={`Scene ${i + 1}`}>
          <Component />
        </Sequence>
      );
    })}
    {order.map(([cfg], i) => (
      <OptionalAudio key={`v${i}`} path={`voiceover/s${i + 1}.mp3`} from={Math.round(cfg.start * FPS) + 9} volume={voiceVolume} />
    ))}
    {sfxCues.map((q, i) => (
      <OptionalAudio key={`x${i}`} path={`sfx/${q.file}`} from={Math.round(q.at * FPS)} volume={sfxVolume} />
    ))}
    <Music />
  </AbsoluteFill>
);

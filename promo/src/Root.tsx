import React from 'react';
import {Composition} from 'remotion';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './config';
import {PromoVideo} from './PromoVideo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="PromoVideo"
    component={PromoVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);

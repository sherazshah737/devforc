import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {SceneFrame} from '../components/SceneFrame';
import {SearchCard} from '../components/SearchCard';
import {brand, scenes} from '../config';
import {sec} from '../lib/anim';

const s = scenes.s3;

export const Scene03Search: React.FC = () => (
  <SceneFrame tone={s.tone}>
    <AbsoluteFill style={{top: 230}}>
      <BlurWords lines={s.lines} tone={s.tone} size={66} delay={6} lineGap={7} emphScale={1.4} />
    </AbsoluteFill>
    <AbsoluteFill style={{top: 1010, alignItems: 'center'}}>
      <SearchCard
        query={brand.searchQuery}
        noResults={s.noResults}
        at={sec(s.cues.card)}
        typingAt={sec(s.cues.typing)}
        resultsAt={sec(s.cues.results)}
      />
    </AbsoluteFill>
  </SceneFrame>
);

import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CheckItem} from '../components/CheckItem';
import {DayBadge} from '../components/DayBadge';
import {DesignCard} from '../components/DesignCard';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {Stamp} from '../components/Stamp';
import {colors, scenes} from '../config';
import {inter} from '../fonts';
import {sec} from '../lib/anim';

const s = scenes.s2;
const c = s.cues;

export const Scene2Design: React.FC = () => (
  <SceneFrame tone={s.tone} step={s.step} bgWord={s.bgWord}>
    <div style={{position: 'absolute', left: 80, top: 210}}>
      <DayBadge text={s.badge} at={sec(c.badge)} />
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 330}}>
      <Reveal at={sec(c.heading)}>
        <div style={{fontFamily: inter, fontWeight: 800, fontSize: 88, lineHeight: 1.04, color: colors.ink, letterSpacing: -2}}>{s.heading}</div>
      </Reveal>
    </div>
    <div style={{position: 'absolute', left: 80, top: 600, display: 'flex', flexDirection: 'column', gap: 30}}>
      {s.items.map((t, i) => (
        <CheckItem key={t} text={t} at={sec(c.items[i])} />
      ))}
    </div>
    <div style={{position: 'absolute', left: 0, top: 1060, width: 1080, height: 700}}>
      {[
        {rotate: -11, x: -250, at: 0},
        {rotate: 11, x: 250, at: 5},
        {rotate: 0, x: 0, at: 10},
      ].map((card, i) => (
        <DesignCard key={i} index={i} src={s.designImages[i]} at={sec(c.cards) + card.at} rotate={card.rotate} offsetX={card.x} />
      ))}
    </div>
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', top: 450}}>
      <Stamp text={s.stamp} at={sec(c.stamp)} />
    </AbsoluteFill>
  </SceneFrame>
);

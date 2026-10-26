import React from 'react';
import {DayBadge} from '../components/DayBadge';
import {ProductCard} from '../components/ProductCard';
import {ProgressBar} from '../components/ProgressBar';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {colors, products, scenes} from '../config';
import {inter} from '../fonts';
import {sec} from '../lib/anim';

const s = scenes.s3;
const c = s.cues;

export const Scene3Build: React.FC = () => (
  <SceneFrame tone={s.tone} step={s.step} bgWord={s.bgWord}>
    <div style={{position: 'absolute', left: 80, top: 210}}>
      <DayBadge text={s.badge} at={sec(c.badge)} />
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 330}}>
      <Reveal at={sec(c.heading)}>
        <div style={{fontFamily: inter, fontWeight: 800, fontSize: 96, lineHeight: 1.04, color: colors.ink, letterSpacing: -2}}>{s.heading}</div>
      </Reveal>
    </div>
    <div style={{position: 'absolute', left: 80, top: 600, width: 920, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
      {products.map((p, i) => (
        <ProductCard key={p.name} index={i} name={p.name} price={p.price} color={p.color} at={sec(c.cards) + i * sec(c.cardStep)} width={292} />
      ))}
    </div>
    <div style={{position: 'absolute', left: 100, top: 1450}}>
      <ProgressBar label={s.uploading} from={sec(c.progressFrom)} to={sec(c.progressTo)} width={880} />
    </div>
  </SceneFrame>
);

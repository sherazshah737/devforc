import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Chip} from '../components/Chip';
import {DayBadge} from '../components/DayBadge';
import {WithChecks} from '../components/Glyphs';
import {PhoneMockup} from '../components/PhoneMockup';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {colors, scenes} from '../config';
import {inter} from '../fonts';
import {sec} from '../lib/anim';

const s = scenes.s4;
const c = s.cues;

export const Scene4Setup: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phone = spring({frame: frame - sec(c.phone), fps, config: {damping: 15, stiffness: 80}});
  const pill = spring({frame: frame - sec(c.mobileTest), fps, config: {damping: 9, stiffness: 220}});
  return (
    <SceneFrame tone={s.tone} step={s.step} bgWord={s.bgWord}>
      <div style={{position: 'absolute', left: 80, top: 210}}>
        <DayBadge text={s.badge} at={sec(c.badge)} />
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: 330}}>
        <Reveal at={sec(c.heading)}>
          <div style={{fontFamily: inter, fontWeight: 800, fontSize: 96, lineHeight: 1.04, color: colors.ink, letterSpacing: -2}}>{s.heading}</div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 70, top: 640, display: 'flex', flexDirection: 'column', gap: 34, alignItems: 'flex-start'}}>
        {s.chips.map((t, i) => (
          <Chip key={t} text={t} at={sec(c.chips[i])} size={40} />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 60,
          top: 560,
          opacity: Math.min(1, phone * 2),
          transform: `translateX(${(1 - phone) * 600}px) rotate(${6 - (1 - phone) * 18}deg)`,
        }}
      >
        <PhoneMockup image={s.phoneImage} width={420} />
      </div>
      <div style={{position: 'absolute', right: 0, width: 540, top: 1440, display: 'flex', justifyContent: 'center'}}>
        {frame >= sec(c.mobileTest) && (
          <div
            style={{
              padding: '22px 46px',
              borderRadius: 999,
              background: colors.ink,
              color: '#fff',
              fontFamily: inter,
              fontWeight: 700,
              fontSize: 44,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              transform: `scale(${0.4 + 0.6 * pill})`,
              opacity: Math.min(1, pill * 3),
              whiteSpace: 'nowrap',
            }}
          >
            <WithChecks text={s.mobileTest} size={44} color={colors.orange} />
          </div>
        )}
      </div>
    </SceneFrame>
  );
};

import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {DayBadge} from '../components/DayBadge';
import {PhoneMockup} from '../components/PhoneMockup';
import {Reveal} from '../components/Reveal';
import {Flash, SceneFrame} from '../components/SceneFrame';
import {colors, scenes} from '../config';
import {inter, mono, oswald} from '../fonts';
import {sec, typed} from '../lib/anim';

const s = scenes.s5;
const c = s.cues;

export const Scene5Live: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const live = spring({frame: frame - sec(c.live), fps, config: {damping: 9, stiffness: 300, mass: 0.6}});
  const phone = spring({frame: frame - sec(c.phone), fps, config: {damping: 16, stiffness: 80}});
  const dot = 0.55 + 0.45 * Math.sin(frame / 4.5);
  const text = typed(s.trainingText, frame, sec(c.typing), 15);
  const done = text.length === s.trainingText.length;
  const shake = frame > sec(c.live) && frame < sec(c.live) + 12 ? Math.sin(frame * 3) * 7 : 0;
  const glow = interpolate(live, [0, 1], [0, 1]);

  return (
    <SceneFrame tone="dark" step={s.step}>
      <div style={{position: 'absolute', left: 80, top: 210}}>
        <DayBadge text={s.badge} at={sec(c.badge)} />
      </div>

      <div style={{position: 'absolute', left: 80, top: 360, width: 580}}>
        <Reveal at={sec(c.store)} blur={0}>
          <div style={{fontFamily: oswald, fontSize: 190, lineHeight: 1, color: '#fff'}}>{s.store}</div>
        </Reveal>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 22, transform: `translateX(${shake}px)`}}>
          {frame >= sec(c.live) && (
            <>
              <div
                style={{
                  fontFamily: oswald,
                  fontSize: 235,
                  lineHeight: 1.05,
                  background: `linear-gradient(180deg, ${colors.orange}, ${colors.orangeDeep})`,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  opacity: Math.min(1, live * 4),
                  transform: `scale(${2.2 - 1.2 * live})`,
                  transformOrigin: 'left center',
                  filter: `drop-shadow(0 0 ${40 * glow}px rgba(240,122,26,0.5))`,
                }}
              >
                {s.live}
              </div>
              <div style={{width: 50, height: 50, borderRadius: '50%', background: colors.red, opacity: dot, boxShadow: `0 0 ${30 * dot}px ${colors.red}`, marginTop: 20, flex: 'none'}} />
            </>
          )}
        </div>
      </div>

      <div style={{position: 'absolute', left: 80, top: 1080, width: 520}}>
        <Reveal at={sec(c.training)} drift={14} blur={0}>
          <div style={{fontFamily: mono, fontWeight: 700, fontSize: 40, color: colors.orange, marginBottom: 18}}>{s.trainingLabel}</div>
        </Reveal>
        <div style={{fontFamily: inter, fontWeight: 600, fontSize: 60, lineHeight: 1.18, color: '#fff', minHeight: 150}}>
          {text}
          {frame >= sec(c.typing) && (
            <span style={{display: 'inline-block', width: 5, height: 56, marginLeft: 4, transform: 'translateY(8px)', background: Math.floor(frame / 10) % 2 === 0 || !done ? colors.orange : 'transparent'}} />
          )}
        </div>
      </div>

      <div style={{position: 'absolute', right: 50, top: 640, opacity: Math.min(1, phone * 2), transform: `translateX(${(1 - phone) * 560}px) rotate(${(1 - phone) * 10}deg)`}}>
        <PhoneMockup image={scenes.s4.phoneImage} width={400} />
      </div>
      <Flash at={sec(c.live)} />
    </SceneFrame>
  );
};

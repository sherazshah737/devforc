import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Hourglass} from '../components/Hourglass';
import {Reveal} from '../components/Reveal';
import {Flash, SceneFrame} from '../components/SceneFrame';
import {colors, scenes} from '../config';
import {mono, oswald} from '../fonts';
import {progress, sec} from '../lib/anim';

const s = scenes.s1;

export const Scene1Hourglass: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = s.cues;

  // "1 MONTH": strike line draws, then the word fades to gray
  const strike = interpolate(frame, [sec(c.strike), sec(c.strike) + 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const gray = progress(frame, sec(c.strike) + 10, 12);
  const oldColor = gray > 0 ? `rgb(${255 - gray * 175},${255 - gray * 175},${255 - gray * 175})` : '#fff';

  // "4 DAYS": slam in with overshoot and a short shake
  const slamF = frame - sec(c.slam);
  const slam = spring({frame: slamF, fps, config: {damping: 9, stiffness: 320, mass: 0.6}});
  const shake = slamF > 0 && slamF < 14 ? Math.sin(slamF * 3.1) * (14 - slamF) * 1.4 : 0;

  return (
    <SceneFrame tone="dark" first>
      <AbsoluteFill style={{left: 50, top: 600, width: 360}}>
        <Reveal at={4} dur={22} drift={30} blur={0}>
          <Hourglass from={sec(c.sandFrom)} to={sec(c.sandTo)} width={360} />
        </Reveal>
      </AbsoluteFill>

      <div style={{position: 'absolute', left: 470, top: 640, width: 570}}>
        <Reveal at={sec(c.label)} drift={20} blur={0}>
          <div style={{fontFamily: mono, fontSize: 38, color: colors.gray, letterSpacing: 1}}>{s.label}</div>
        </Reveal>

        <Reveal at={sec(c.old)} drift={30} blur={0} style={{position: 'relative', marginTop: 10}}>
          <div style={{fontFamily: oswald, fontSize: 130, lineHeight: 1.05, color: oldColor, whiteSpace: 'nowrap'}}>{s.old}</div>
          <div style={{position: 'absolute', left: -10, top: '52%', height: 14, borderRadius: 7, width: `${strike * 104}%`, background: `linear-gradient(90deg, ${colors.orange}, ${colors.orangeDeep})`, boxShadow: '0 0 24px rgba(240,122,26,0.7)'}} />
        </Reveal>

        <div style={{position: 'relative', marginTop: 40, height: 190}}>
          {slamF >= 0 && (
            <div
              style={{
                fontFamily: oswald,
                fontSize: 150,
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                background: `linear-gradient(180deg, ${colors.orange}, ${colors.orangeDeep})`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(240,122,26,0.45))',
                opacity: Math.min(1, slam * 4),
                transform: `translate(${shake}px, ${shake * 0.5}px) scale(${3 - 2 * slam})`,
                transformOrigin: 'left center',
              }}
            >
              {s.fresh}
            </div>
          )}
        </div>

        <Reveal at={sec(c.cta)} drift={20} blur={0}>
          <div style={{fontFamily: mono, fontSize: 42, fontWeight: 700, color: colors.orange, marginTop: 16}}>{s.cta}</div>
        </Reveal>
      </div>

      <div style={{position: 'absolute', left: 80, bottom: 150, fontFamily: mono, fontSize: 26, lineHeight: 1.7, color: '#4C4C4C'}}>
        {s.filler.map((l, i) => (
          <Reveal key={i} at={sec(0.8 + i * 0.35)} drift={10} blur={0}>
            {l}
          </Reveal>
        ))}
      </div>
      <Flash at={sec(c.slam)} />
    </SceneFrame>
  );
};

import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CommentBar} from '../components/CommentBar';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {brand, colors, scenes} from '../config';
import {inter, oswald} from '../fonts';
import {sec} from '../lib/anim';

const s = scenes.s7;
const c = s.cues;

export const Scene7Launch: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pill = spring({frame: frame - sec(c.pill), fps, config: {damping: 11, stiffness: 190}});
  const big = spring({frame: frame - sec(c.big), fps, config: {damping: 10, stiffness: 160, mass: 0.8}});
  return (
    <SceneFrame tone={s.tone} step={s.step} bgWord={s.bgWord}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 230}}>
        <Reveal at={sec(c.heading)}>
          <div style={{fontFamily: inter, fontWeight: 800, fontSize: 84, lineHeight: 1.08, color: colors.ink, letterSpacing: -2}}>{s.heading}</div>
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 80, top: 680, transform: `scale(${0.5 + 0.5 * pill})`, opacity: Math.min(1, pill * 3), transformOrigin: 'left center'}}>
        <div style={{display: 'inline-block', padding: '20px 48px', borderRadius: 999, background: `linear-gradient(90deg, ${colors.orange}, ${colors.orangeDeep})`, color: '#fff', fontFamily: inter, fontWeight: 800, fontSize: 50, boxShadow: '0 14px 34px rgba(232,93,12,0.4)'}}>{s.pill} ↓</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 830, textAlign: 'center', opacity: Math.min(1, big * 3), transform: `scale(${0.6 + 0.4 * big})`}}>
        <div
          style={{
            display: 'inline-block',
            fontFamily: oswald,
            fontSize: 265,
            lineHeight: 1.05,
            background: `linear-gradient(180deg, ${colors.orange}, ${colors.orangeDeep})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0 18px 30px rgba(232,93,12,0.3))',
          }}
        >
          {s.big}
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, top: 1380}}>
        <CommentBar keyword={brand.commentKeyword} at={sec(c.bar)} typingAt={sec(c.typing)} sendAt={sec(c.send)} />
      </div>
    </SceneFrame>
  );
};

import React from 'react';
import {Reveal} from '../components/Reveal';
import {PuzzlePieces} from '../components/PuzzlePieces';
import {SceneFrame} from '../components/SceneFrame';
import {colors, scenes} from '../config';
import {inter, mono} from '../fonts';
import {sec, typed} from '../lib/anim';
import {useCurrentFrame} from 'remotion';

const s = scenes.s6;
const c = s.cues;

const Camera: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', marginLeft: 10}}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
);

const Label: React.FC<{small: string; big: string; at: number; color: string; accent?: boolean; camera?: boolean}> = ({small, big, at, color, accent, camera}) => {
  const frame = useCurrentFrame();
  const a = typed(small, frame, sec(at), 14);
  const b = typed(big, frame, sec(at) + 8, 22);
  return (
    <div style={{width: 400, textAlign: 'center', minHeight: 120}}>
      <div style={{fontFamily: mono, fontWeight: 700, fontSize: 38, color: accent ? colors.orange : colors.grayDark, letterSpacing: 2, textTransform: 'uppercase', minHeight: 50}}>{a}</div>
      <div style={{fontFamily: inter, fontWeight: 700, fontSize: 40, color, lineHeight: 1.15}}>
        {b}
        {camera && b.length === big.length && <Camera />}
      </div>
    </div>
  );
};

export const Scene6Puzzle: React.FC = () => (
  <SceneFrame tone={s.tone}>
    <div style={{position: 'absolute', left: 80, right: 80, top: 300}}>
      <Reveal at={sec(c.heading)}>
        <div style={{fontFamily: inter, fontWeight: 900, fontSize: 118, lineHeight: 1.04, color: colors.ink, letterSpacing: -3, textAlign: 'center'}}>{s.heading}</div>
      </Reveal>
    </div>

    {/* "us" label sits above the orange piece */}
    <div style={{position: 'absolute', left: 544, top: 590}}>
      <Label small={s.us.label} big={s.us.text} at={c.us} color={colors.orange} accent />
    </div>

    <div style={{position: 'absolute', left: 132, top: 790}}>
      <PuzzlePieces at={sec(c.pieces)} />
    </div>

    {/* "you" label sits under the black piece */}
    <div style={{position: 'absolute', left: 136, top: 1250}}>
      <Label small={s.you.label} big={s.you.text} at={c.you} color={colors.ink} camera />
    </div>
  </SceneFrame>
);

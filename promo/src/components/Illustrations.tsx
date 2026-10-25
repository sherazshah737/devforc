import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {fontFamily} from '../fonts';

/** Tilted price tag that swings in from the right and settles with a damped pendulum swing. */
export const PriceTag: React.FC<{text: string; at: number}> = ({text, at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = Math.max(0, frame - at);
  const enter = spring({frame: frame - at, fps, config: {damping: 16, stiffness: 90}});
  const swing = 14 + 30 * Math.exp(-t / 28) * Math.cos(t / 5.2);
  return (
    <div
      style={{
        position: 'absolute',
        right: 110,
        bottom: 250,
        width: 330,
        height: 480,
        transformOrigin: '50% 8%',
        transform: `translateX(${(1 - enter) * 700}px) rotate(${swing}deg)`,
        opacity: Math.min(1, enter * 3),
      }}
    >
      <svg width="330" height="480" viewBox="0 0 330 480" style={{overflow: 'visible'}}>
        <path d="M165 40 C 140 0, 120 -80, 165 -160" stroke={colors.deepBurgundy} strokeWidth="6" fill="none" />
        <path
          d="M90 40 H240 Q270 40 270 70 V420 Q270 450 240 450 H90 Q60 450 60 420 V70 Q60 40 90 40 Z"
          fill={colors.burgundy}
          style={{filter: 'drop-shadow(0 24px 30px rgba(50,5,15,0.35))'}}
        />
        <circle cx="165" cy="92" r="20" fill={colors.grayLight} />
        <rect x="84" y="140" width="162" height="3" rx="2" fill="rgba(241,238,236,0.35)" />
        <text
          x="165"
          y="300"
          textAnchor="middle"
          fontFamily={fontFamily}
          fontStyle="italic"
          fontWeight="900"
          fontSize="76"
          fill={colors.offWhite}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

/** Flat, lonely person: head circle, body rect, legs. */
export const Person: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 18, stiffness: 80}});
  const bob = Math.sin(frame / 22) * 5;
  return (
    <div style={{opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 80 + bob}px)`}}>
      <svg width="420" height="720" viewBox="0 0 420 720">
        <ellipse cx="210" cy="680" rx="150" ry="22" fill="rgba(60,10,20,0.18)" />
        <rect x="150" y="440" width="52" height="230" rx="20" fill={colors.deepBurgundy} />
        <rect x="218" y="440" width="52" height="230" rx="20" fill={colors.deepBurgundy} />
        <rect x="78" y="190" width="40" height="230" rx="20" fill={colors.burgundy} />
        <rect x="302" y="190" width="40" height="230" rx="20" fill={colors.burgundy} />
        <rect x="100" y="180" width="220" height="300" rx="46" fill={colors.burgundy} />
        <circle cx="210" cy="96" r="76" fill={colors.deepBurgundy} />
      </svg>
    </div>
  );
};

const BILLS = [
  {x: -40, r: -9, d: 0},
  {x: 50, r: 7, d: 5},
  {x: -10, r: -3, d: 10},
  {x: 70, r: 11, d: 15},
  {x: -60, r: -12, d: 20},
  {x: 20, r: 5, d: 25},
  {x: -20, r: -6, d: 30},
];

const Bill: React.FC = () => (
  <svg width="420" height="200" viewBox="0 0 420 200">
    <rect x="4" y="4" width="412" height="192" rx="16" fill={colors.billGreen} stroke={colors.billGreenDark} strokeWidth="6" />
    <rect x="24" y="24" width="372" height="152" rx="10" fill="none" stroke={colors.billGreenDark} strokeWidth="3" strokeDasharray="10 6" />
    <circle cx="210" cy="100" r="54" fill="#8CCB9B" stroke={colors.billGreenDark} strokeWidth="5" />
    <text x="210" y="124" textAnchor="middle" fontFamily={fontFamily} fontStyle="italic" fontWeight="900" fontSize="76" fill={colors.billGreenDark}>
      $
    </text>
    {[50, 370].map((x) => (
      <text key={x} x={x} y="62" textAnchor="middle" fontFamily={fontFamily} fontStyle="italic" fontWeight="700" fontSize="34" fill={colors.billGreenDark}>
        $
      </text>
    ))}
  </svg>
);

/** A stack of green bills that tumbles in one after another. */
export const DollarStack: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'relative', width: 520, height: 300}}>
      {BILLS.map((b, i) => {
        const p = spring({frame: frame - at - b.d, fps, config: {damping: 11, stiffness: 120, mass: 0.9}});
        const y = interpolate(p, [0, 1], [-1300, 0]);
        const rot = interpolate(p, [0, 1], [b.r * 9, b.r]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 50 + b.x,
              bottom: i * 26,
              opacity: p > 0.001 ? 1 : 0,
              transform: `translateY(${y}px) rotate(${rot}deg)`,
              filter: 'drop-shadow(0 10px 12px rgba(30,60,40,0.3))',
            }}
          >
            <Bill />
          </div>
        );
      })}
    </div>
  );
};

/** Comment input: types the keyword, then the send button pulses. */
export const CommentBar: React.FC<{
  keyword: string;
  at: number;
  typingAt: number;
  sendAt: number;
}> = ({keyword, at, typingAt, sendAt}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const chars = Math.max(0, Math.min(keyword.length, Math.floor((frame - typingAt) / 4)));
  const typed = keyword.slice(0, chars);
  const pulsing = frame >= sendAt;
  const beat = pulsing ? (frame - sendAt) % 30 : 0;
  const scale = pulsing ? 1 + 0.16 * Math.sin((beat / 30) * Math.PI) : 1;
  const ring = pulsing ? beat / 30 : 0;
  return (
    <div
      style={{
        width: 940,
        height: 130,
        borderRadius: 65,
        background: colors.white,
        boxShadow: '0 24px 60px rgba(60,10,20,0.22)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px 0 22px',
        gap: 22,
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
        fontFamily,
        fontStyle: 'italic',
      }}
    >
      <div style={{width: 84, height: 84, borderRadius: 42, flex: 'none', background: `linear-gradient(135deg, ${colors.burgundy}, ${colors.deepBurgundy})`}} />
      <div style={{flex: 1, fontSize: 50, color: typed ? colors.ink : '#A39B99', whiteSpace: 'nowrap'}}>
        {typed || 'Add a comment…'}
        {typed && (
          <span
            style={{
              display: 'inline-block',
              width: 3,
              height: 54,
              marginLeft: 4,
              transform: 'translateY(8px)',
              background: Math.floor(frame / 12) % 2 === 0 || chars < keyword.length ? colors.burgundy : 'transparent',
            }}
          />
        )}
      </div>
      <div style={{position: 'relative', width: 90, height: 90, flex: 'none'}}>
        {pulsing && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 45,
              border: `4px solid ${colors.burgundy}`,
              opacity: 1 - ring,
              transform: `scale(${1 + ring * 0.8})`,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 45,
            background: colors.burgundy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale})`,
            opacity: chars === 0 ? 0.45 : 1,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={colors.offWhite} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

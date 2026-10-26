import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {inter, oswald} from '../fonts';
import {ImageOrFallback} from './ImageOrFallback';

const Drawn: React.FC<{variant: number}> = ({variant}) => {
  const themes = [
    {bg: '#F6EFE8', hero: '#E9C9B0', accent: colors.ink},
    {bg: '#101010', hero: colors.orange, accent: '#fff'},
    {bg: '#EEF2EA', hero: '#CFD8C8', accent: '#2F4A2A'},
  ][variant % 3];
  return (
    <div style={{position: 'absolute', inset: 0, background: themes.bg, padding: 22, fontFamily: inter}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
        <div style={{fontFamily: oswald, fontSize: 26, letterSpacing: 2, color: themes.accent}}>STORE</div>
        <div style={{display: 'flex', gap: 8}}>
          {[0, 1, 2].map((i) => <div key={i} style={{width: 26, height: 5, borderRadius: 3, background: themes.accent, opacity: 0.4}} />)}
        </div>
      </div>
      <div style={{height: variant === 1 ? 190 : 150, borderRadius: variant === 2 ? 90 : 16, background: themes.hero, marginBottom: 18}} />
      <div style={{height: 16, width: '70%', borderRadius: 8, background: themes.accent, opacity: 0.75, marginBottom: 10}} />
      <div style={{height: 12, width: '45%', borderRadius: 6, background: themes.accent, opacity: 0.25, marginBottom: 20}} />
      <div style={{display: 'grid', gridTemplateColumns: variant === 1 ? '1fr' : '1fr 1fr', gap: 12}}>
        {(variant === 1 ? [0] : [0, 1, 2, 3]).map((i) => (
          <div key={i} style={{height: variant === 1 ? 90 : 78, borderRadius: 12, background: themes.accent, opacity: 0.12}} />
        ))}
      </div>
    </div>
  );
};

/** One of three fanned store-design cards sliding up from the bottom. */
export const DesignCard: React.FC<{index: number; src: string; at: number; rotate: number; offsetX: number}> = ({index, src, at, rotate, offsetX}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 15, stiffness: 100}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 540 - 190 + offsetX,
        top: 0,
        width: 380,
        height: 560,
        borderRadius: 30,
        overflow: 'hidden',
        background: '#fff',
        border: '8px solid #fff',
        boxShadow: '0 30px 60px rgba(80,40,10,0.28)',
        transformOrigin: '50% 100%',
        transform: `translateY(${(1 - p) * 900}px) rotate(${rotate * p}deg)`,
      }}
    >
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden'}}>
        <ImageOrFallback src={src} fallback={<Drawn variant={index} />} />
      </div>
    </div>
  );
};

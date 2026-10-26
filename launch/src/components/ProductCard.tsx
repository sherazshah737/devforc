import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {inter} from '../fonts';

const Shape: React.FC<{i: number}> = ({i}) => {
  const c = 'rgba(28,28,28,0.16)';
  const shapes = [
    <rect key="a" x="30" y="40" width="100" height="90" rx="14" fill={c} />,
    <path key="b" d="M45 60h70l8 70H37z M60 60c0-30 40-30 40 0" fill="none" stroke={c} strokeWidth="14" strokeLinejoin="round" />,
    <path key="c" d="M30 130V70l30-30h40l30 30v60z" fill={c} />,
    <rect key="d" x="20" y="75" width="120" height="26" rx="13" fill={c} />,
    <path key="e" d="M30 110c0-50 100-50 100 0z M15 110h130v14H15z" fill={c} />,
    <path key="f" d="M20 120c10-50 50-30 70-30 30 0 50 10 50 30z" fill={c} />,
  ];
  return <svg width="160" height="160" viewBox="0 0 160 160">{shapes[i % shapes.length]}</svg>;
};

/** Product tile (image, name, price) that pops into the grid. */
export const ProductCard: React.FC<{name: string; price: string; color: string; index: number; at: number; width?: number}> = ({name, price, color, index, at, width = 290}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 12, stiffness: 170}});
  return (
    <div
      style={{
        width,
        borderRadius: 28,
        background: colors.white,
        padding: 14,
        boxShadow: '0 18px 40px rgba(80,40,10,0.16)',
        opacity: Math.min(1, p * 3),
        transform: `scale(${0.7 + 0.3 * p}) translateY(${(1 - p) * 40}px)`,
        fontFamily: inter,
      }}
    >
      <div style={{height: width * 0.78, borderRadius: 20, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Shape i={index} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 6px 6px'}}>
        <span style={{fontWeight: 600, fontSize: 27, color: colors.ink}}>{name}</span>
        <span style={{fontWeight: 800, fontSize: 31, color: colors.orange}}>{price}</span>
      </div>
    </div>
  );
};

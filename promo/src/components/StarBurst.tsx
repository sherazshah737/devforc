import React from 'react';
import {useCurrentFrame} from 'remotion';

const POINTS = 8;

const buildPath = (outer: number, inner: number) => {
  const pts: string[] = [];
  for (let i = 0; i < POINTS * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / POINTS - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
};

const PATH = buildPath(50, 31);

/** Decorative 8-point starburst that rotates slowly (degrees per second via `speed`). */
export const StarBurst: React.FC<{
  size: number;
  color: string;
  opacity?: number;
  speed?: number;
  phase?: number;
  style?: React.CSSProperties;
}> = ({size, color, opacity = 1, speed = 6, phase = 0, style}) => {
  const frame = useCurrentFrame();
  const rotation = phase + (frame / 30) * speed;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{position: 'absolute', opacity, transform: `rotate(${rotation}deg)`, ...style}}
    >
      <polygon points={PATH} fill={color} />
    </svg>
  );
};

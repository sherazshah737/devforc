import {Easing, interpolate} from 'remotion';
import {FPS} from '../config';

export const sec = (s: number) => Math.round(s * FPS);
export const easeOut = Easing.out(Easing.cubic);

export const progress = (frame: number, start: number, dur = 16) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

/** Characters of `text` typed so far (cps = characters per second). */
export const typed = (text: string, frame: number, startFrame: number, cps = 18) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor(((frame - startFrame) / FPS) * cps))));

import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors, Tone} from '../config';
import {fontFamily} from '../fonts';
import {progress} from '../lib/anim';

type Seg = {text: string; emphasis: boolean};

/** "not *having one*" -> [{not, false}, {having one, true}] */
const parseLine = (line: string): Seg[] =>
  line
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('*') && part.endsWith('*') && part.length > 2
        ? {text: part.slice(1, -1), emphasis: true}
        : {text: part, emphasis: false},
    );

export const textColors = (tone: Tone) =>
  tone === 'light'
    ? {body: colors.ink, emphasis: colors.burgundy}
    : {body: colors.offWhite, emphasis: colors.white};

/**
 * Words fade in from a 12px blur with a slight upward drift, staggered word by word.
 * Wrap words in *asterisks* for emphasis (larger, bold italic, burgundy / cream on burgundy).
 */
export const BlurWords: React.FC<{
  lines: readonly string[];
  tone?: Tone;
  /** frame (within the scene) the first word starts */
  delay?: number;
  /** frames between words */
  stagger?: number;
  /** extra frames of pause between lines */
  lineGap?: number;
  /** override: absolute start frame for each line (ignores delay/lineGap) */
  lineStarts?: readonly number[];
  size?: number;
  emphScale?: number;
  lineHeight?: number;
  weight?: number;
  emphWeight?: number;
  align?: 'center' | 'left';
  style?: React.CSSProperties;
}> = ({
  lines,
  tone = 'light',
  delay = 6,
  stagger = 4,
  lineGap = 0,
  lineStarts,
  size = 66,
  emphScale = 1.4,
  lineHeight = 1.18,
  weight = 400,
  emphWeight = 700,
  align = 'center',
  style,
}) => {
  const frame = useCurrentFrame();
  const c = textColors(tone);
  let counter = 0;

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', ...style}}>
      {lines.map((line, li) => {
        const segs = parseLine(line);
        const base = lineStarts ? lineStarts[li] : delay + counter * stagger + li * lineGap;
        let w = 0;
        return (
          <div
            key={li}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: align === 'center' ? 'center' : 'flex-start',
              alignItems: 'baseline',
              columnGap: size * 0.26,
              fontFamily,
              fontStyle: 'italic',
              lineHeight,
              textAlign: align,
            }}
          >
            {segs.flatMap((seg) =>
              seg.text
                .split(/\s+/)
                .filter(Boolean)
                .map((word) => {
                  const start = base + w * stagger;
                  w++;
                  counter++;
                  const p = progress(frame, start, 16);
                  return (
                    <span
                      key={`${li}-${w}`}
                      style={{
                        display: 'inline-block',
                        opacity: p,
                        filter: p < 1 ? `blur(${(1 - p) * 12}px)` : undefined,
                        transform: `translateY(${(1 - p) * 22}px)`,
                        fontSize: seg.emphasis ? size * emphScale : size,
                        fontWeight: seg.emphasis ? emphWeight : weight,
                        color: seg.emphasis ? c.emphasis : c.body,
                        willChange: 'filter, opacity, transform',
                      }}
                    >
                      {word}
                    </span>
                  );
                }),
            )}
          </div>
        );
      })}
    </div>
  );
};

/** How many frames BlurWords needs to finish all words (handy for chaining). */
export const wordsDuration = (lines: readonly string[], stagger = 4, lineGap = 0) =>
  lines.join(' ').replace(/\*/g, '').split(/\s+/).filter(Boolean).length * stagger + lines.length * lineGap + 16;

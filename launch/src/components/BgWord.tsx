import React from 'react';
import {colors} from '../config';
import {inter} from '../fonts';

/** Giant faded word at the bottom, partly cut off by the frame. */
export const BgWord: React.FC<{word: string}> = ({word}) => (
  <div
    style={{
      position: 'absolute',
      left: -30,
      bottom: -110,
      fontFamily: inter,
      fontWeight: 900,
      fontSize: 470,
      letterSpacing: -14,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      color: colors.orange,
      opacity: 0.08,
    }}
  >
    {word}
  </div>
);

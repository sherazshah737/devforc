import React from 'react';
import {colors, steps, Tone} from '../config';
import {mono} from '../fonts';

/** 01 · 02 · 03 · 04 indicator with the active step in orange. */
export const StepDots: React.FC<{active: number; tone: Tone}> = ({active, tone}) => (
  <div style={{position: 'absolute', top: 96, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, fontFamily: mono, fontSize: 34, fontWeight: 700}}>
    {steps.map((s, i) => {
      const on = i + 1 === active;
      return (
        <React.Fragment key={s}>
          {i > 0 && <span style={{color: tone === 'light' ? 'rgba(28,28,28,0.25)' : 'rgba(255,255,255,0.25)'}}>·</span>}
          <span
            style={{
              color: on ? colors.orange : tone === 'light' ? 'rgba(28,28,28,0.38)' : 'rgba(255,255,255,0.4)',
              borderBottom: on ? `4px solid ${colors.orange}` : '4px solid transparent',
              paddingBottom: 4,
            }}
          >
            {s}
          </span>
        </React.Fragment>
      );
    })}
  </div>
);

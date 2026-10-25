import React from 'react';
import {colors} from '../config';
import {fontFamily} from '../fonts';

/** Generic browser window: traffic lights + URL pill + content area. */
export const BrowserMockup: React.FC<{
  url: string;
  width: number;
  height: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({url, width, height, children, style}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 28,
      background: colors.white,
      boxShadow: '0 40px 90px rgba(40,5,12,0.35), 0 0 0 2px rgba(255,255,255,0.4)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    <div
      style={{
        height: 76,
        flex: 'none',
        background: '#E9E6E5',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 26px',
      }}
    >
      {['#EC6A5E', '#F4BF4F', '#61C554'].map((c) => (
        <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
      ))}
      <div
        style={{
          marginLeft: 22,
          flex: 1,
          height: 44,
          borderRadius: 22,
          background: colors.white,
          display: 'flex',
          alignItems: 'center',
          padding: '0 22px',
          fontFamily,
          fontSize: 26,
          color: '#6C6462',
          fontStyle: 'italic',
        }}
      >
        {url}
      </div>
    </div>
    <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}>{children}</div>
  </div>
);

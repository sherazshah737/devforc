import React from 'react';
import {colors, brand} from '../config';
import {inter, oswald} from '../fonts';
import {ImageOrFallback} from './ImageOrFallback';

const DrawnStore: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#FBF7F3', fontFamily: inter}}>
    <div style={{height: 92, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 26px 12px'}}>
      <div style={{fontFamily: oswald, fontSize: 34, color: colors.ink, letterSpacing: 2}}>{brand.storeName}</div>
      <div style={{width: 38, height: 38, borderRadius: 19, background: colors.ink}} />
    </div>
    <div style={{margin: '8px 20px', height: 250, borderRadius: 26, background: `linear-gradient(135deg, ${colors.orange}, ${colors.orangeDeep})`, color: '#fff', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
      <div style={{fontSize: 20, fontWeight: 600, opacity: 0.85}}>NEW COLLECTION</div>
      <div style={{fontFamily: oswald, fontSize: 60, lineHeight: 1}}>SHOP NOW</div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '12px 20px'}}>
      {['#E9C9B0', '#CFD8C8', '#C9CFE0', '#DDC3CC'].map((c, i) => (
        <div key={i}>
          <div style={{height: 170, borderRadius: 20, background: c}} />
          <div style={{height: 12, width: '70%', borderRadius: 6, background: '#DDD5CE', marginTop: 12}} />
          <div style={{fontSize: 22, fontWeight: 800, color: colors.orange, marginTop: 6}}>{['$48', '$32', '$64', '$39'][i]}</div>
        </div>
      ))}
    </div>
  </div>
);

/** Phone showing a store homepage (/public/store-mobile.png if present, otherwise a drawn page). */
export const PhoneMockup: React.FC<{image: string; width?: number; style?: React.CSSProperties}> = ({image, width = 400, style}) => {
  const h = width * 2.05;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: width * 0.14,
        background: '#0B0B0B',
        padding: width * 0.03,
        boxShadow: '0 50px 90px rgba(0,0,0,0.4), inset 0 0 0 3px #2A2A2A',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: width * 0.115, overflow: 'hidden', background: '#fff'}}>
        <ImageOrFallback src={image} fallback={<DrawnStore />} />
      </div>
      <div style={{position: 'absolute', top: width * 0.055, left: '50%', width: width * 0.3, height: width * 0.075, marginLeft: -width * 0.15, borderRadius: 99, background: '#0B0B0B'}} />
    </div>
  );
};

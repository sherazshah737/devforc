import React from 'react';
import {colors} from '../config';
import {fontFamily} from '../fonts';

const Stars: React.FC<{size?: number}> = ({size = 40}) => (
  <div style={{display: 'flex', gap: 6}}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z" fill={colors.star} />
      </svg>
    ))}
  </div>
);

const base: React.CSSProperties = {position: 'absolute', inset: 0, fontFamily, fontStyle: 'italic', background: '#FBFAF9', padding: 34};

/** Generic store used for the "competitor.com" mockup (scene 5). */
export const StoreScreen: React.FC<{banner: string; products: readonly {name: string; price: string}[]}> = ({banner, products}) => (
  <div style={{...base, padding: 0}}>
    <div style={{height: 78, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px', borderBottom: '2px solid #EEEBEA'}}>
      <div style={{fontSize: 34, fontWeight: 900, color: colors.ink, letterSpacing: 3}}>STORE</div>
      <div style={{display: 'flex', gap: 26, fontSize: 24, color: '#7B7270'}}>
        <span>Shop</span><span>Sale</span><span>Cart</span>
      </div>
    </div>
    <div
      style={{
        margin: 28,
        height: 230,
        borderRadius: 22,
        background: `linear-gradient(120deg, ${colors.deepBurgundy}, #B8566A)`,
        color: colors.offWhite,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 44px',
      }}
    >
      <div style={{fontSize: 24, opacity: 0.8}}>Just landed</div>
      <div style={{fontSize: 68, fontWeight: 700}}>{banner}</div>
    </div>
    <div style={{display: 'flex', gap: 22, padding: '0 28px'}}>
      {products.map((p, i) => (
        <div key={i} style={{flex: 1}}>
          <div style={{height: 260, borderRadius: 18, background: ['#E4DEDC', '#D8D2D0', '#EAE5E3'][i % 3]}} />
          <div style={{fontSize: 26, color: colors.ink, marginTop: 14}}>{p.name}</div>
          <div style={{fontSize: 30, fontWeight: 700, color: colors.burgundy}}>{p.price}</div>
        </div>
      ))}
    </div>
  </div>
);

/** Portfolio fallback 1: reviews with 5 stars */
export const ReviewsScreen: React.FC = () => (
  <div style={base}>
    <div style={{fontSize: 40, fontWeight: 700, color: colors.ink}}>What clients say</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, margin: '14px 0 26px'}}>
      <Stars size={46} />
      <span style={{fontSize: 34, color: colors.ink}}>4.9</span>
    </div>
    {[0, 1].map((i) => (
      <div key={i} style={{background: colors.white, borderRadius: 22, padding: 26, marginBottom: 20, boxShadow: '0 6px 20px rgba(0,0,0,0.07)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14}}>
          <div style={{width: 54, height: 54, borderRadius: 27, background: i ? colors.deepBurgundy : colors.burgundy}} />
          <Stars size={32} />
        </div>
        <div style={{height: 18, borderRadius: 9, background: '#E7E3E2', width: '92%', marginBottom: 12}} />
        <div style={{height: 18, borderRadius: 9, background: '#E7E3E2', width: '64%'}} />
      </div>
    ))}
  </div>
);

/** Portfolio fallback 2: product grid with prices */
export const ProductGridScreen: React.FC = () => (
  <div style={base}>
    <div style={{fontSize: 40, fontWeight: 700, color: colors.ink, marginBottom: 22}}>Shop</div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
      {[
        ['Product one', '$29', '#E4DEDC'],
        ['Product two', '$49', '#D8D2D0'],
        ['Product three', '$35', '#EAE5E3'],
        ['Product four', '$62', '#DDD7D5'],
      ].map(([n, pr, bg]) => (
        <div key={n} style={{background: colors.white, borderRadius: 20, padding: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.07)'}}>
          <div style={{height: 150, borderRadius: 14, background: bg}} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12}}>
            <span style={{fontSize: 26, color: colors.ink}}>{n}</span>
            <span style={{fontSize: 32, fontWeight: 700, color: colors.burgundy}}>{pr}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WhatsAppIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.4z" />
    <path d="M9 8.5c.2 3 2.5 5.3 5.5 5.5l1.2-1.4-2-1-.9.7a3.6 3.6 0 0 1-1.7-1.7l.7-.9-1-2z" fill="#fff" stroke="none" />
  </svg>
);

export const WhatsAppButton: React.FC<{label: string; size?: number}> = ({label, size = 1}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18 * size,
      background: colors.whatsapp,
      color: colors.white,
      borderRadius: 60 * size,
      padding: `${22 * size}px ${40 * size}px`,
      fontFamily,
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: 38 * size,
      boxShadow: '0 14px 30px rgba(37,211,102,0.4)',
    }}
  >
    <WhatsAppIcon size={46 * size} />
    {label}
  </div>
);

/** Portfolio fallback 3: product + green "Order on WhatsApp" button */
export const OrderScreen: React.FC<{label: string}> = ({label}) => (
  <div style={{...base, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: '100%', height: 250, borderRadius: 22, background: '#E4DEDC'}} />
    <div style={{alignSelf: 'flex-start', fontSize: 42, fontWeight: 700, color: colors.ink, marginTop: 22}}>Signature Item</div>
    <div style={{alignSelf: 'flex-start', fontSize: 34, color: colors.burgundy, fontWeight: 700}}>$45 · Ships in 2 days</div>
    <div style={{marginTop: 'auto', marginBottom: 20}}>
      <WhatsAppButton label={label} />
    </div>
  </div>
);

export const ChipStars: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, background: colors.white, borderRadius: 40, padding: '14px 26px', boxShadow: '0 10px 26px rgba(0,0,0,0.2)'}}>
    <Stars size={34} />
    <span style={{fontFamily, fontStyle: 'italic', fontWeight: 700, fontSize: 32, color: colors.ink}}>4.9</span>
  </div>
);

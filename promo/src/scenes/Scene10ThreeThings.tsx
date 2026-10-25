import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BlurWords} from '../components/BlurWords';
import {BrowserMockup} from '../components/BrowserMockup';
import {ChipStars, OrderScreen, ProductGridScreen, ReviewsScreen, WhatsAppButton} from '../components/MockScreens';
import {PortfolioShot} from '../components/PortfolioShot';
import {Reveal} from '../components/Reveal';
import {SceneFrame} from '../components/SceneFrame';
import {brand, colors, scenes} from '../config';
import {fontFamily} from '../fonts';
import {progress, sec} from '../lib/anim';

const s = scenes.s10;

const ListItem: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const item = s.items[index];
  const nextAt = index < s.items.length - 1 ? sec(s.items[index + 1].at) : 1e9;
  const active = frame < nextAt;
  const dim = interpolate(frame, [nextAt, nextAt + 14], [1, 0.4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Reveal at={sec(item.at)} style={{position: 'absolute', top: 350 + index * 190, left: 90, right: 90}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: dim, fontFamily, fontStyle: 'italic'}}>
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
            flex: 'none',
            background: active ? colors.burgundy : colors.deepBurgundy,
            color: colors.offWhite,
            fontWeight: 900,
            fontSize: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {index + 1}
        </div>
        <div>
          <div style={{fontSize: 78, fontWeight: 700, color: colors.burgundy, lineHeight: 1.05}}>{item.title}</div>
          <div style={{fontSize: 42, color: colors.ink, marginTop: 4}}>{item.sub}</div>
        </div>
      </div>
    </Reveal>
  );
};

const Screen: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, sec(s.items[index].at), 16);
  const shot = [
    <PortfolioShot
      key="a"
      src={s.images[0]}
      fallback={<ReviewsScreen />}
      overlay={<div style={{position: 'absolute', left: 30, bottom: 30}}><ChipStars /></div>}
    />,
    <PortfolioShot key="b" src={s.images[1]} fallback={<ProductGridScreen />} />,
    <PortfolioShot
      key="c"
      src={s.images[2]}
      fallback={<OrderScreen label={s.whatsappLabel} />}
      overlay={<div style={{position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center'}}><WhatsAppButton label={s.whatsappLabel} /></div>}
    />,
  ][index];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: p, filter: p < 1 ? `blur(${(1 - p) * 14}px)` : undefined}}>{shot}</div>
  );
};

export const Scene10ThreeThings: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const shrink = spring({frame: frame - sec(s.cues.shrink), fps, config: {damping: 20, stiffness: 90}});
  const headerTop = interpolate(shrink, [0, 1], [760, 120]);
  const headerScale = interpolate(shrink, [0, 1], [1, 0.62]);
  const mockAt = sec(s.items[0].at) - 8;
  const mock = spring({frame: frame - mockAt, fps, config: {damping: 18, stiffness: 80}});
  return (
    <SceneFrame tone={s.tone} corners={['tl', 'br']}>
      <AbsoluteFill style={{top: headerTop, transform: `scale(${headerScale})`, transformOrigin: '50% 0'}}>
        <BlurWords lines={s.lines} tone={s.tone} size={72} delay={6} lineGap={4} emphScale={1.35} />
      </AbsoluteFill>

      {s.items.map((_, i) => (
        <ListItem key={i} index={i} />
      ))}

      <AbsoluteFill style={{top: 960, alignItems: 'center'}}>
        <div style={{opacity: Math.min(1, mock * 2), transform: `translateY(${(1 - mock) * 500}px)`}}>
          <BrowserMockup url={brand.workTag.split('·').pop()!.trim()} width={880} height={720}>
            {s.items.map((_, i) => (
              <Screen key={i} index={i} />
            ))}
          </BrowserMockup>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: 70,
          bottom: 90,
          fontFamily,
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 5,
          color: colors.burgundy,
          opacity: progress(frame, sec(s.items[0].at), 20),
        }}
      >
        {brand.workTag}
      </div>
    </SceneFrame>
  );
};

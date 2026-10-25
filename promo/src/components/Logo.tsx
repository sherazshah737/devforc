import React from 'react';
import {Img, staticFile} from 'remotion';
import {brand, colors} from '../config';
import {fontFamily} from '../fonts';
import {useAssetExists} from '../lib/assets';

/** /public/logo.png (white backgrounds blend away via multiply), or the fallback agency name as text. */
export const Logo: React.FC<{width?: number}> = ({width = 760}) => {
  const exists = useAssetExists('logo.png', 'image');
  if (exists === null) return null;
  if (!exists) {
    return (
      <div
        style={{
          fontFamily,
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: 120,
          letterSpacing: 8,
          color: colors.burgundy,
          textAlign: 'center',
        }}
      >
        {brand.fallbackName}
      </div>
    );
  }
  return <Img src={staticFile('logo.png')} style={{width, height: 'auto', mixBlendMode: 'multiply'}} />;
};

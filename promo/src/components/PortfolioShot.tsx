import React from 'react';
import {Img, staticFile} from 'remotion';
import {useAssetExists} from '../lib/assets';

/** Shows /public/<src> filling its parent (plus optional `overlay`); renders the drawn `fallback` mockup when the file is missing. */
export const PortfolioShot: React.FC<{src: string; fallback: React.ReactNode; overlay?: React.ReactNode}> = ({
  src,
  fallback,
  overlay,
}) => {
  const exists = useAssetExists(src, 'image');
  if (exists === null) return null;
  if (!exists) return <>{fallback}</>;
  return (
    <>
      <Img
        src={staticFile(src)}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}}
      />
      {overlay}
    </>
  );
};

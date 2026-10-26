import React from 'react';
import {Img, staticFile} from 'remotion';
import {useAssetExists} from '../lib/assets';

/** Fills its (positioned) parent with /public/<src>, or renders the drawn `fallback` when the file is missing. */
export const ImageOrFallback: React.FC<{src: string; fallback: React.ReactNode}> = ({src, fallback}) => {
  const exists = useAssetExists(src, 'image');
  if (exists === null) return null;
  if (!exists) return <>{fallback}</>;
  return (
    <Img
      src={staticFile(src)}
      style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}}
    />
  );
};

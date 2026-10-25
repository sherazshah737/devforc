import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

const cache = new Map<string, boolean>();
const pending = new Map<string, Promise<boolean>>();

const probe = (path: string, kind: 'image' | 'audio'): Promise<boolean> => {
  const key = `${kind}:${path}`;
  const hit = pending.get(key);
  if (hit) return hit;
  const p = fetch(staticFile(path))
    .then((res) => {
      const type = res.headers.get('content-type') ?? '';
      res.body?.cancel().catch(() => undefined);
      return res.ok && type.startsWith(kind + '/');
    })
    .catch(() => false)
    .then((ok) => {
      cache.set(key, ok);
      return ok;
    });
  pending.set(key, p);
  return p;
};

/**
 * Does /public/<path> exist? Holds the render until we know, so missing optional
 * assets (logo, portfolio shots, music) never produce a broken frame.
 */
export const useAssetExists = (path: string, kind: 'image' | 'audio' = 'image') => {
  const key = `${kind}:${path}`;
  const [exists, setExists] = useState<boolean | null>(cache.get(key) ?? null);
  const [handle] = useState(() => (cache.has(key) ? null : delayRender(`Checking ${path}`)));

  useEffect(() => {
    if (handle === null) return;
    let live = true;
    probe(path, kind).then((ok) => {
      continueRender(handle); // always release, even if unmounted meanwhile
      if (live) setExists(ok);
    });
    return () => {
      live = false;
    };
  }, [handle, kind, path]);

  return exists;
};

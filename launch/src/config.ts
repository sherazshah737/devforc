/**
 * EVERYTHING you are likely to edit lives here: copy, timings, colors, prices.
 *
 * - Times are in SECONDS. Scene `start`/`end` are absolute; `cues` are relative to their scene's start.
 * - The voice-over clips (public/voiceover/s1.mp3 … s8.mp3) start 0.3s after their scene starts,
 *   so if you change scene timings keep the cues roughly in step with the narration.
 * - A "✓" inside any text is drawn as a check icon.
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const colors = {
  orange: '#F07A1A',
  orangeDeep: '#E85D0C',
  ink: '#1C1C1C',
  white: '#FFFFFF',
  darkCenter: '#1A1A1A',
  darkEdge: '#0A0A0A',
  peach1: '#F7DCC4',
  peach2: '#F3CFB0',
  gray: '#8C8C8C',
  grayDark: '#4A4A4A',
  red: '#E5322D',
  sand: '#F2B33D',
  wood: '#8B5A2B',
} as const;

export type Tone = 'dark' | 'light';

export const brand = {
  /** Used when /public/logo.png is missing */
  fallbackName: 'YOUR AGENCY',
  storeName: 'STORE',
  commentKeyword: 'LAUNCH',
};

export const transitionSeconds = 0.4;
export const musicVolume = 0.18;
export const voiceVolume = 1;
export const sfxVolume = 0.5;

/** Step indicator labels shown at the top of the scenes. */
export const steps = ['01', '02', '03', '04'];

export const products = [
  {name: 'Linen Shirt', price: '$48', color: '#E9C9B0'},
  {name: 'Canvas Tote', price: '$32', color: '#CFD8C8'},
  {name: 'Daily Hoodie', price: '$64', color: '#C9CFE0'},
  {name: 'Leather Belt', price: '$39', color: '#D9BFA8'},
  {name: 'Sun Hat', price: '$27', color: '#EBDDB5'},
  {name: 'Sneakers', price: '$89', color: '#DDC3CC'},
];

export const scenes = {
  s1: {
    start: 0,
    end: 7,
    tone: 'dark' as Tone,
    label: 'People say',
    old: '1 MONTH',
    fresh: '4 DAYS',
    cta: "Here's how →",
    filler: ['// delivery_estimate: unknown', '// status: still "in progress"', '// invoice: pending...'],
    cues: {label: 0.4, old: 2.1, strike: 3.1, slam: 4.7, cta: 5.8, sandFrom: 0.4, sandTo: 6.2},
  },
  s2: {
    start: 7,
    end: 15.7,
    tone: 'light' as Tone,
    step: 1,
    bgWord: 'design',
    badge: 'Day 01',
    heading: 'Understand your business',
    items: ['What do you sell?', "Who's your customer?", 'Which stores do you love?'],
    stamp: 'Design ✓ approved',
    /** public/designs/1.png, 2.png, 3.png — drawn mockups are used if missing */
    designImages: ['designs/1.png', 'designs/2.png', 'designs/3.png'],
    cues: {badge: 0.35, heading: 1.2, items: [2.7, 3.6, 4.5], cards: 4.9, stamp: 7.2},
  },
  s3: {
    start: 15.7,
    end: 20.7,
    tone: 'light' as Tone,
    step: 2,
    bgWord: 'build',
    badge: 'Day 02',
    heading: 'We build the store',
    uploading: 'Uploading products',
    cues: {badge: 0.35, heading: 1.2, cards: 1.9, cardStep: 0.28, progressFrom: 2.4, progressTo: 4.5},
  },
  s4: {
    start: 20.7,
    end: 27.3,
    tone: 'light' as Tone,
    step: 3,
    bgWord: 'setup',
    badge: 'Day 03',
    heading: 'Setup + testing',
    chips: ['Payments', 'Shipping rates', 'WhatsApp button'],
    mobileTest: '✓ Mobile test',
    /** public/store-mobile.png — a drawn phone screen is used if missing */
    phoneImage: 'store-mobile.png',
    cues: {badge: 0.35, heading: 1.1, chips: [1.3, 1.9, 2.5], phone: 3.4, mobileTest: 5.1},
  },
  s5: {
    start: 27.3,
    end: 32.6,
    tone: 'dark' as Tone,
    step: 4,
    badge: 'Day 04',
    store: 'STORE',
    live: 'LIVE',
    trainingLabel: 'Training:',
    trainingText: 'how to run it yourself',
    cues: {badge: 0.35, store: 1.3, live: 2.35, phone: 2.6, training: 3.1, typing: 3.5},
  },
  s6: {
    start: 32.6,
    end: 37.4,
    tone: 'light' as Tone,
    heading: 'All you need',
    you: {label: 'you', text: 'product details + photos'},
    us: {label: 'us', text: 'the rest'},
    cues: {heading: 0.4, pieces: 0.9, you: 0.8, us: 3.2},
  },
  s7: {
    start: 37.4,
    end: 42.2,
    tone: 'light' as Tone,
    step: 4,
    bgWord: 'launch',
    heading: 'Want to launch your store this month?',
    pill: 'Comment below',
    big: 'LAUNCH',
    cues: {heading: 0.4, pill: 1.8, big: 2.5, bar: 3.0, typing: 3.4, send: 4.3},
  },
  s8: {
    start: 42.2,
    end: 45.4,
    tone: 'light' as Tone,
    tag: 'Shopify store · 4 days',
    cues: {logo: 0.3, tag: 1.2},
  },
} as const;

export const TOTAL_SECONDS = scenes.s8.end;
export const TOTAL_FRAMES = Math.round(TOTAL_SECONDS * FPS);

/** Optional sound effects: put whoosh.mp3 / tick.mp3 / hit.mp3 in public/sfx/ (skipped if missing). */
const abs = (scene: {start: number}, rel: number) => scene.start + rel;
export const sfxCues: {file: string; at: number}[] = [
  ...Object.values(scenes).slice(1).map((s) => ({file: 'whoosh.mp3', at: s.start})),
  {file: 'hit.mp3', at: abs(scenes.s1, scenes.s1.cues.slam)},
  {file: 'hit.mp3', at: abs(scenes.s5, scenes.s5.cues.live)},
  {file: 'whoosh.mp3', at: abs(scenes.s1, scenes.s1.cues.strike)},
  ...scenes.s2.cues.items.map((c) => ({file: 'tick.mp3', at: abs(scenes.s2, c)})),
  ...scenes.s4.cues.chips.map((c) => ({file: 'tick.mp3', at: abs(scenes.s4, c)})),
  {file: 'hit.mp3', at: abs(scenes.s2, scenes.s2.cues.stamp)},
  {file: 'hit.mp3', at: abs(scenes.s6, scenes.s6.cues.pieces + 1.1)},
  {file: 'tick.mp3', at: abs(scenes.s4, scenes.s4.cues.mobileTest)},
];

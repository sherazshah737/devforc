/**
 * EVERYTHING you are likely to edit lives here: copy, timings, colors, prices.
 *
 * - All times are in SECONDS. Scene `start`/`end` are absolute (from the start of the video);
 *   `cues` are relative to the start of their own scene.
 * - Inline emphasis: wrap words in *asterisks* to make them big, bold and burgundy
 *   (cream on burgundy scenes). Example: "not *having one*".
 * - Changing `prices` updates every number in the video (and the math in scenes 8 and 9).
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const colors = {
  burgundy: '#7A1023',
  deepBurgundy: '#5C0B1A',
  offWhite: '#F1EEEC',
  ink: '#2A1519', // body text on light scenes
  grayLight: '#EFEDEC',
  grayMid: '#DAD6D5',
  grayDark: '#B9B2B1',
  white: '#FFFFFF',
  green: '#2E9E5B',
  billGreen: '#6DB77F',
  billGreenDark: '#3E8B55',
  whatsapp: '#25D366',
  star: '#F2B01E',
} as const;

export const prices = {
  customersPerMonth: 5,
  valuePerCustomer: 200,
  /** What you tell people over Instagram DM (scene 4) */
  instagramQuote: 45,
  monthsPerYear: 12,
};
export const monthlyLoss = prices.customersPerMonth * prices.valuePerCustomer;
export const yearlyLoss = monthlyLoss * prices.monthsPerYear;
export const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const brand = {
  /** Used when /public/logo.png is missing */
  fallbackName: 'YOUR AGENCY',
  /** Name shown in the chat header (scene 4) */
  chatHandle: 'yourbrand',
  searchQuery: 'your brand name',
  competitorUrl: 'competitor.com',
  workTag: 'OUR WORK · yoursite.com',
  commentKeyword: 'WEBSITE',
};

/** Length of the crossfade/blur between scenes. */
export const transitionSeconds = 0.4;

/** Music volume (0–1). Only used if /public/music.mp3 exists. */
export const musicVolume = 0.35;

/** Voice-over volume (0–1). Per-scene files at /public/voiceover/s1.mp3 … s13.mp3 are used if present. */
export const voiceVolume = 1;

/** Narration script, one entry per scene (record/generate each as public/voiceover/sN.mp3). */
export const voiceScript: Record<string, string> = {
  s1: 'You think a website is expensive?',
  s2: 'Truth is, not having one costs more.',
  s3: 'A customer hears your name, Googles it, finds nothing.',
  s4: 'So they check Instagram and DM you, just to ask the price.',
  s5: "Why? Because your competitor's website looks more professional.",
  s6: 'And the worst part? You never even find out.',
  s7: 'One day, they just buy from your competitor.',
  s8: `Do the math. ${prices.customersPerMonth} customers, times ${usd(prices.valuePerCustomer)}, every month. ${usd(monthlyLoss)}.`,
  s9: `Per year, ${usd(yearlyLoss)}. That's the real cost.`,
  s10: 'A good website does three things. One: trust. Real work, real reviews. Two: clarity. What, how much, and when it arrives. Three: easy ordering. One tap to WhatsApp.',
  s11: 'Not just a pretty website. A website that sells.',
  s12: `Comment ${brand.commentKeyword}, and I'll tell you exactly what your business needs. Totally free.`,
  s13: 'Follow for more website tips.',
};

export type Tone = 'light' | 'burgundy';

export const scenes = {
  s1: {
    start: 0,
    end: 3.0,
    tone: 'light' as Tone,
    lines: ['You think a website is', '*expensive?*'],
    tagText: '$???',
    cues: {tag: 1.3},
  },
  s2: {
    start: 3.0,
    end: 6.5,
    tone: 'burgundy' as Tone,
    lines: ['Truth is,', '*not having one*', 'costs more.'],
  },
  s3: {
    start: 6.5,
    end: 12.0,
    tone: 'light' as Tone,
    lines: ['A customer hears your name,', 'Googles it,', '*finds nothing.*'],
    noResults: 'No results found',
    cues: {card: 1.5, typing: 2.0, results: 3.5},
  },
  s4: {
    start: 12.0,
    end: 16.6,
    tone: 'light' as Tone,
    lines: ['So they check Instagram', 'and DM you', 'just to ask the *price.*'],
    userMessage: 'How much?',
    reply: `${usd(prices.instagramQuote)}. Want to order?`,
    cues: {card: 0.6, user: 2.3, typing: 2.8, reply: 3.3},
  },
  s5: {
    start: 16.6,
    end: 21.6,
    tone: 'burgundy' as Tone,
    big: 'Why?',
    lines: ["Because your competitor's", 'website looks more', '*professional.*'],
    banner: 'New Season',
    products: [
      {name: 'Classic Tee', price: '$29'},
      {name: 'Daily Hoodie', price: '$59'},
      {name: 'Canvas Tote', price: '$24'},
    ],
    cues: {text: 1.0, browser: 2.2},
  },
  s6: {
    start: 21.6,
    end: 26.1,
    tone: 'light' as Tone,
    lines: ['And the worst part?', '*You never even find out.*'],
    cues: {second: 1.4, person: 2.2},
  },
  s7: {
    start: 26.1,
    end: 29.4,
    tone: 'light' as Tone,
    lines: ['One day, they just', 'buy from your *competitor.*'],
  },
  s8: {
    start: 29.4,
    end: 36.6,
    tone: 'light' as Tone,
    title: '*Do the math.*',
    // Lines build one by one at these cue times (seconds into the scene)
    build: [
      {text: `*${prices.customersPerMonth}* customers`, at: 1.4},
      {text: `*× ${usd(prices.valuePerCustomer)}*`, at: 2.6},
      {text: 'every month', at: 4.1},
    ],
    result: {value: monthlyLoss, at: 5.0},
    cues: {bills: 5.4},
  },
  s9: {
    start: 36.6,
    end: 41.5,
    tone: 'burgundy' as Tone,
    lines: ['per year'],
    result: {value: yearlyLoss, at: 1.1},
    after: "That's the *real cost.*",
    cues: {after: 2.8},
  },
  s10: {
    start: 41.5,
    end: 56.1,
    tone: 'light' as Tone,
    lines: ['A good website does', '*three things.*'],
    items: [
      {title: 'Trust', sub: 'real work, real reviews', at: 3.2},
      {title: 'Clarity', sub: 'what, how much, when it arrives', at: 6.4},
      {title: 'Easy ordering', sub: 'one tap to WhatsApp', at: 10.7},
    ],
    cues: {shrink: 2.3},
    /** Drop your screenshots at public/portfolio/1.png, 2.png, 3.png */
    images: ['portfolio/1.png', 'portfolio/2.png', 'portfolio/3.png'],
    whatsappLabel: 'Order on WhatsApp',
  },
  s11: {
    start: 56.1,
    end: 60.3,
    tone: 'burgundy' as Tone,
    lines: ['Not just a pretty website.', 'A website that *sells.*'],
    cues: {second: 1.8},
  },
  s12: {
    start: 60.3,
    end: 67.3,
    tone: 'light' as Tone,
    comment: 'Comment',
    lines: ["and I'll tell you exactly", 'what your business needs.'],
    free: '*Totally free.*',
    cues: {keyword: 0.8, rest: 1.5, free: 4.0, typing: 4.6, send: 5.7},
  },
  s13: {
    start: 67.3,
    end: 70.3,
    tone: 'light' as Tone,
    lines: ['Follow for more', '*website tips.*'],
    cues: {text: 0.9},
  },
} as const;

export const TOTAL_SECONDS = scenes.s13.end;
export const TOTAL_FRAMES = Math.round(TOTAL_SECONDS * FPS);

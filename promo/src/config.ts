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

export type Tone = 'light' | 'burgundy';

export const scenes = {
  s1: {
    start: 0,
    end: 3,
    tone: 'light' as Tone,
    lines: ['You think a website is', '*expensive?*'],
    tagText: '$???',
    cues: {tag: 1.3},
  },
  s2: {
    start: 3,
    end: 6,
    tone: 'burgundy' as Tone,
    lines: ['Truth is,', '*not having one*', 'costs more.'],
  },
  s3: {
    start: 6,
    end: 12,
    tone: 'light' as Tone,
    lines: ['A customer hears your name,', 'Googles it,', '*finds nothing.*'],
    noResults: 'No results found',
    cues: {card: 1.9, typing: 2.5, results: 4.3},
  },
  s4: {
    start: 12,
    end: 15,
    tone: 'light' as Tone,
    lines: ['So they check Instagram', 'and DM you', 'just to ask the *price.*'],
    userMessage: 'How much?',
    reply: `${usd(prices.instagramQuote)}. Want to order?`,
    cues: {card: 0.7, user: 1.2, typing: 1.7, reply: 2.2},
  },
  s5: {
    start: 15,
    end: 21,
    tone: 'burgundy' as Tone,
    big: 'Why?',
    lines: ["Because your competitor's", 'website looks more', '*professional.*'],
    banner: 'New Season',
    products: [
      {name: 'Classic Tee', price: '$29'},
      {name: 'Daily Hoodie', price: '$59'},
      {name: 'Canvas Tote', price: '$24'},
    ],
    cues: {text: 1.1, browser: 3.0},
  },
  s6: {
    start: 21,
    end: 27,
    tone: 'light' as Tone,
    lines: ['And the worst part?', '*You never even find out.*'],
    cues: {second: 1.6, person: 3.0},
  },
  s7: {
    start: 27,
    end: 30,
    tone: 'light' as Tone,
    lines: ['One day, they just', 'buy from your *competitor.*'],
  },
  s8: {
    start: 30,
    end: 39,
    tone: 'light' as Tone,
    title: '*Do the math.*',
    // Lines build one by one at these cue times (seconds into the scene)
    build: [
      {text: `*${prices.customersPerMonth}* customers`, at: 1.8},
      {text: `*× ${usd(prices.valuePerCustomer)}*`, at: 2.9},
      {text: 'every month', at: 4.0},
    ],
    result: {value: monthlyLoss, at: 5.4},
    cues: {bills: 5.6},
  },
  s9: {
    start: 39,
    end: 43,
    tone: 'burgundy' as Tone,
    lines: ['per year'],
    result: {value: yearlyLoss, at: 0.9},
    after: "That's the *real cost.*",
    cues: {after: 2.3},
  },
  s10: {
    start: 43,
    end: 57,
    tone: 'light' as Tone,
    lines: ['A good website does', '*three things.*'],
    items: [
      {title: 'Trust', sub: 'real work, real reviews', at: 3.8},
      {title: 'Clarity', sub: 'what, how much, when it arrives', at: 7.4},
      {title: 'Easy ordering', sub: 'one tap to WhatsApp', at: 10.8},
    ],
    cues: {shrink: 2.6},
    /** Drop your screenshots at public/portfolio/1.png, 2.png, 3.png */
    images: ['portfolio/1.png', 'portfolio/2.png', 'portfolio/3.png'],
    whatsappLabel: 'Order on WhatsApp',
  },
  s11: {
    start: 57,
    end: 60,
    tone: 'burgundy' as Tone,
    lines: ['Not just a pretty website.', 'A website that *sells.*'],
    cues: {second: 1.3},
  },
  s12: {
    start: 60,
    end: 68,
    tone: 'light' as Tone,
    comment: 'Comment',
    lines: ["and I'll tell you exactly", 'what your business needs.'],
    free: '*Totally free.*',
    cues: {keyword: 0.5, rest: 1.7, free: 3.6, typing: 4.2, send: 6.0},
  },
  s13: {
    start: 68,
    end: 71,
    tone: 'light' as Tone,
    lines: ['Follow for more', '*website tips.*'],
    cues: {text: 0.9},
  },
} as const;

export const TOTAL_SECONDS = scenes.s13.end;
export const TOTAL_FRAMES = Math.round(TOTAL_SECONDS * FPS);

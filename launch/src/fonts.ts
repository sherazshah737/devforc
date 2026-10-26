import {loadFont as loadOswald} from '@remotion/google-fonts/Oswald';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

// Oswald Bold (uppercase headlines on dark scenes), Inter (light-scene headings + lists), JetBrains Mono (labels)
export const oswald = loadOswald('normal', {weights: ['700'], subsets: ['latin']}).fontFamily;
export const inter = loadInter('normal', {weights: ['500', '600', '700', '800', '900'], subsets: ['latin']}).fontFamily;
export const mono = loadMono('normal', {weights: ['400', '500', '700'], subsets: ['latin']}).fontFamily;

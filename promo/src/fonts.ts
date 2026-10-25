import {loadFont} from '@remotion/google-fonts/PlayfairDisplay';

// Playfair Display Italic: 400 for body copy, 700/900 for emphasis words and big numbers.
export const {fontFamily} = loadFont('italic', {
  weights: ['400', '700', '900'],
  subsets: ['latin'],
});

/**
 * The images behind the question and the two results, and where each came
 * from. All twelve were approved one by one by the owner on 2026-11-17; see
 * docs/specs/background-images.md. Each file in public/images/quiz/ must have
 * an entry here: the credits page is built from this list, and a test checks
 * the two match.
 *
 * The files were shrunk with Windows' System.Drawing from Wikimedia Commons'
 * 960-pixel copies: posters to 360 pixels wide, photos to 640 pixels wide and
 * turned grey, all saved as JPEG at quality 45.
 */

/** Which backdrop an image belongs to. "question-a" and "question-b" are the two sides. */
export type ImageSet = 'question-a' | 'question-b' | 'communist' | 'fascist';

export type Licence = 'public-domain' | 'cc-by-sa-3.0' | 'cc-by-sa-4.0';

/** Listed by name so that a missing description in src/i18n is a type error. */
export type ImageId =
  | 'rep-internacionales'
  | 'rep-avant'
  | 'rep-himno'
  | 'nat-barrer'
  | 'com-belomorkanal'
  | 'com-perm36'
  | 'com-stalin-pipe'
  | 'com-mao-poster'
  | 'com-mao-tiananmen'
  | 'fas-birkenau'
  | 'fas-auschwitz-gate'
  | 'fas-nuremberg';

export interface QuizImage {
  /** File name in public/images/quiz/, without the extension. Also the key of its description in src/i18n. */
  id: ImageId;
  set: ImageSet;
  width: number;
  height: number;
  /** Who made the original, as Wikimedia Commons gives it. A proper name, so not translated. */
  author: string | null;
  /** The file's page on Wikimedia Commons. */
  source: string;
  licence: Licence;
  /** True when the copy here was turned grey as well as shrunk. */
  grey: boolean;
}

export const LICENCE_URL: Readonly<Record<Licence, string | null>> = {
  'public-domain': null,
  'cc-by-sa-3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'cc-by-sa-4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

const commons = (file: string): string =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`;

export const QUIZ_IMAGES: readonly QuizImage[] = [
  {
    id: 'rep-internacionales',
    set: 'question-a',
    width: 360,
    height: 512,
    author: null,
    source: commons('Spanish Civil War poster 01.jpg'),
    licence: 'public-domain',
    grey: false,
  },
  {
    id: 'rep-avant',
    set: 'question-a',
    width: 360,
    height: 531,
    author: null,
    source: commons('Spanish Civil War poster 04.jpg'),
    licence: 'public-domain',
    grey: false,
  },
  {
    id: 'rep-himno',
    set: 'question-a',
    width: 360,
    height: 500,
    author: null,
    source: commons('Republica Viva España.jpg'),
    licence: 'public-domain',
    grey: false,
  },
  {
    id: 'nat-barrer',
    set: 'question-b',
    width: 360,
    height: 528,
    author: null,
    source: commons('Barrer España - Bando nacional.jpg'),
    licence: 'public-domain',
    grey: false,
  },
  {
    id: 'com-belomorkanal',
    set: 'communist',
    width: 640,
    height: 521,
    author: null,
    source: commons('Canal Mer Blanche.jpg'),
    licence: 'public-domain',
    grey: true,
  },
  {
    id: 'com-perm36',
    set: 'communist',
    width: 640,
    height: 360,
    author: 'Gerald Praschl',
    source: commons('The fence at the old GULag in Perm-36.JPG'),
    licence: 'cc-by-sa-3.0',
    grey: true,
  },
  {
    id: 'com-stalin-pipe',
    set: 'communist',
    width: 640,
    height: 457,
    author: 'Viktor Deni',
    source: commons("Deni - Trubka Stalina - Stalin's Pipe, 1930.jpg"),
    licence: 'public-domain',
    grey: true,
  },
  {
    id: 'com-mao-poster',
    set: 'communist',
    width: 640,
    height: 440,
    author: null,
    source: commons('Cultural Revolution propaganda poster featuring Mao Zedong.jpg'),
    licence: 'public-domain',
    grey: true,
  },
  {
    id: 'com-mao-tiananmen',
    set: 'communist',
    width: 640,
    height: 480,
    author: '我乃野云鹤',
    source: commons('Portrait of Chairman Mao on Tiananmen Gatetower.jpg'),
    licence: 'cc-by-sa-4.0',
    grey: true,
  },
  {
    id: 'fas-birkenau',
    set: 'fascist',
    width: 640,
    height: 332,
    author: 'Logaritmo',
    source: commons('Gate of Auschwitz II, 28 November 2007.jpg'),
    licence: 'public-domain',
    grey: true,
  },
  {
    id: 'fas-auschwitz-gate',
    set: 'fascist',
    width: 640,
    height: 360,
    author: 'Yair Haklai',
    source: commons('The arbeit macht frei gate in Auschwitz I.jpg'),
    licence: 'cc-by-sa-4.0',
    grey: true,
  },
  {
    id: 'fas-nuremberg',
    set: 'fascist',
    width: 640,
    height: 504,
    author: 'Raymond D’Addario (U.S. Army)',
    source: commons('Defendants in the dock at nuremberg trials.jpg'),
    licence: 'public-domain',
    grey: true,
  },
];

export const imagePath = (image: QuizImage): string => `/images/quiz/${image.id}.jpg`;

export const imagesIn = (set: ImageSet): QuizImage[] =>
  QUIZ_IMAGES.filter((image) => image.set === set);

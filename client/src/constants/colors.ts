import { ThemeMode } from '@/src/context/ThemeContext';

export type ColorScheme = {
  primary: string;
  accent: string;
  background: string;
  text: string;
  greyText: string;
  grey: string;
  tile: string;
  red: string;
  green: string;
  dotted: string;
};

export const colors: Record<Exclude<ThemeMode, 'system'>, ColorScheme> = {
  light: {
    primary: '#54FFAD',
    accent: '#14C886',
    background: '#edf2f4',
    text: '#000000',
    greyText: '#ced4da',
    grey: '#7A858E',
    tile: '#EBEBF5',
    red: '#F8284A',
    green: '#14C886',
    dotted: '#EBEBF5'
  },

  dark: {
    primary: '#54FFAD',
    accent: '#14C886',
    background: '#101112',
    text: '#ffffff',
    greyText: '#ced4da',
    grey: '#7A858E',
    tile: '#485151',
    red: '#F8284A',
    green: '#14C886',
    dotted: '#EBEBF5'
  }
};

// useTheme.js
import { colors } from '@/src/constants/colors';
import { ThemeContext } from '@/src/context/ThemeContext';
import { useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const useTheme = () => {
  const { mode, updateTheme } = useContext(ThemeContext);

  const activeMode =
    mode === 'system'
      ? Appearance.getColorScheme() === 'dark'
        ? 'dark'
        : 'light'
      : mode;

  const activeColors = colors[activeMode];
  const [isDarkMode, setIsDarkMode] = useState(activeMode === 'dark');

  const switchMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    updateTheme({ mode: newMode });
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setIsDarkMode(mode === 'dark');
  }, [mode]);

  return {
    activeMode,
    activeColors,
    isDarkMode,
    switchMode
  };
};

export default useTheme;

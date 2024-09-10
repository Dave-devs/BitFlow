import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export const useLoadFonts = () => {
  const [loaded, error] = useFonts({
    'InterR': require('../../assets/fonts/Inter_24pt-Regular.ttf'),
    'InterM': require('../../assets/fonts/Inter_24pt-Medium.ttf'),
    'InterB': require('../../assets/fonts/Inter_24pt-Bold.ttf'),
    'InterSB': require('../../assets/fonts/Inter_24pt-SemiBold.ttf'),
    'InterEB': require('../../assets/fonts/Inter_24pt-ExtraBold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
};

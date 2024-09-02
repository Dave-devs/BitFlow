import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    async function loadResourceDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          InterRegular: require('@/assets/fonts/Inter_24pt-Regular.ttf'),
          InterMedium: require('@/assets/fonts/Inter_24pt-Medium.ttf'),
          InterBold: require('@/assets/fonts/Inter_24pt-Bold.ttf'),
          InterSemiBold: require('@/assets/fonts/Inter_24pt-SemiBold.ttf'),
          InterExtraBold: require('@/assets/fonts/Inter_24pt-ExtraBold.ttf'),

          ...FontAwesome.font
        });
      } catch (error) {
        console.error('Error loading resources:', error);
        alert('Error loading resources');
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourceDataAsync();
  }, []);
  return isLoadingComplete;
}

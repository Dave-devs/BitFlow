import { getData, storeData } from '@/src/config/asyncStorage';
import { ThemeMode } from '@/src/context/ThemeContext';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import {store} from '@/src/stores/store';
import { useFonts } from 'expo-font';

const queryClient = new QueryClient();

export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    inter: require('../../assets/fonts/Inter_24pt-Regular.ttf'),
    interM: require('../../assets/fonts/Inter_24pt-Medium.ttf'),
    interB: require('../../assets/fonts/Inter_24pt-Bold.ttf'),
    interSB: require('../../assets/fonts/Inter_24pt-SemiBold.ttf'),
    interEB: require('../../assets/fonts/Inter_24pt-ExtraBold.ttf')
  });
  
  const [theme, setTheme] = useState<{ mode: ThemeMode }>({ mode: 'system' });

  const updateTheme = (newTheme: { mode?: ThemeMode }) => {
    let mode: ThemeMode;
    if (!newTheme.mode) {
      mode = theme.mode === 'dark' ? 'light' : 'dark';
    } else {
      mode = newTheme.mode;
    }
    setTheme({ mode });
    storeData('appTheme', { mode });
  };

  useEffect(() => {
    const fetchStoredTheme = async () => {
      try {
        const themeData = await getData('appTheme');
        if (themeData && themeData.mode) {
          updateTheme({ mode: themeData.mode });
        } else {
          // Default behavior if no stored theme found
          const systemColorScheme = Appearance.getColorScheme();
          updateTheme({ mode: systemColorScheme as ThemeMode });
        }
      } catch (error) {
        alert(error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    fetchStoredTheme();
  }, []);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ mode: colorScheme as ThemeMode });
    });

    return () => listener.remove();
  }, []);

  

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // const { loaded, error } = useLoadFonts();

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <RootLayoutNav />
        </Provider>
        <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const [session, setSession] = useState<boolean>(true);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationDuration: 300,
        animationTypeForReplace: 'pop',
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      {session ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auths)" />
      )}
      <Stack.Screen name="(pages)" />
    </Stack>
  );
}





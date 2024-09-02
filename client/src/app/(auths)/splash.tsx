import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router';
import { logoImageUrl } from '@/src/constants/images';
import useTheme from '@/src/hooks/useTheme';
import { fontsize } from '@/src/constants/tokens';

const SplashScreen = () => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.replace('/welcome');
    }, 100);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.logoContainer}>
        <View>
          <Image source={{ uri: logoImageUrl }} style={styles.image} />
        </View>
        <Text style={[styles.logoText, { color: activeColors.text }]}>BITFLOW</Text>
      </View>
      <Text style={[styles.text, { color: activeColors.text }]}>Crypto Wallet You Can Trust!</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  logoText: {
    fontSize: fontsize.md,
    fontFamily: 'InterSemiBold'
  },
  text: {
    fontSize: fontsize.xs,
    fontFamily: 'InterRegular'
  }
})
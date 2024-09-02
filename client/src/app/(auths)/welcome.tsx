import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';
import Button from '@/src/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logoImageUrl } from '@/src/constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fontsize } from '@/src/constants/tokens';
import OutlineButton from '@/src/components/OutlineButton';
import AuthSeparator from '@/src/components/AuthSeparator';
import AuthButton from '@/src/components/AuthButton';

const WelcomScreen = () => {
  const insets = useSafeAreaInsets();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={{ uri: logoImageUrl }} style={[styles.image]} />
        <Text style={[styles.text, { color: activeColors.text }]}>BITFLOW</Text>
      </View>
      {/* Welcome Text */}
      <Text style={[styles.welcome, { color: activeColors.text }]}>
        Welcome
      </Text>
      {/* Auth Buttons */}
      <View style={{ gap: 15 }}>
        <Button text="Register" onPress={() => router.replace('/register')} />
        <OutlineButton text={'Login'} onPress={() => router.replace('/login')} />
      </View>

      {/* Separator */}
      <AuthSeparator />
      {/* Socail Auth Buttons */}
      <View style={{ gap: 10 }}>
        <AuthButton icon={'apple'} text={'Continue with Apple'} onPress={() => { }} />
        <AuthButton icon={'google'} text={'Continue with Google'} onPress={() => { }} />
        <AuthButton icon={'facebook'} text={'Continue with Facebook'} onPress={() => { }} />
      </View>
    </View>
  );
};

export default WelcomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  text: {
    fontFamily: 'InterSemiBold',
    fontSize: fontsize.md
  },
  welcome: {
    fontFamily: 'InterExtraBold',
    fontSize: fontsize.lg
  }
});

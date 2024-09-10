import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '@/src/hooks/useTheme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fontsize } from '@/src/constants/tokens';
import AuthSeparator from '@/src/components/AuthSeparator';
import AuthButton from '@/src/components/AuthButton';
import Button from '@/src/components/Button';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <KeyboardAvoidingView>
        <View
          style={[styles.headerTextContainer, { paddingTop: insets.top + 20 }]}
        >
          <Text style={[styles.headerText, { color: activeColors.text }]}>
            Welcome back
          </Text>
          <Text
            style={[styles.subHeaderText, { color: activeColors.greyText }]}
          >
            Enter your credentials to continue
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.titleText, { color: activeColors.greyText }]}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="johndoe@gmail.com"
            numberOfLines={1}
            inputMode="text"
            enterKeyHint="next"
            placeholderTextColor={activeColors.tile}
            style={[
              styles.textInput,
              { color: activeColors.greyText, borderColor: activeColors.text }
            ]}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.titleText, { color: activeColors.greyText }]}>
            Password
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Password must be at least 8 characters"
            numberOfLines={1}
            inputMode="numeric"
            enterKeyHint="send"
            secureTextEntry={true}
            placeholderTextColor={activeColors.tile}
            style={[
              styles.textInput,
              { color: activeColors.greyText, borderColor: activeColors.text }
            ]}
          />
        </View>

        <View style={styles.noAccountContainer}>
          <Text style={[styles.acctText, { color: activeColors.greyText }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('/register')}>
            <Text style={[styles.signupText, { color: activeColors.primary }]}>Register</Text>
          </TouchableOpacity>
        </View>

        <Button text="Login" onPress={() => { }} />
        {/* Separator */}
        <AuthSeparator />

        {/* Socail Auth Buttons */}
        <View style={{ gap: 10, paddingTop: 20 }}>
          <AuthButton icon={'apple'} text={'Continue with Apple'} onPress={() => { }} />
          <AuthButton icon={'google'} text={'Continue with Google'} onPress={() => { }} />
          <AuthButton icon={'facebook'} text={'Continue with Facebook'} onPress={() => { }} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextContainer: {
    alignSelf: 'flex-start',
    paddingBottom: 30
  },
  headerText: {
    fontFamily: 'InterB',
    fontSize: fontsize.lg
  },
  subHeaderText: {
    fontFamily: 'InterR',
    fontSize: fontsize.xs
  },
  inputContainer: {
    gap: 5,
    paddingBottom: 20
  },
  titleText: {
    fontFamily: 'InterR',
    fontSize: fontsize.xs
  },
  textInput: {
    height: hp('5.6%'),
    width: wp('90%'),
    fontFamily: 'InterR',
    fontSize: fontsize.sm,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  noAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: -15
  },
  acctText: {
    fontFamily: 'InterR',
    fontSize: 10,
  },
  signupText: {
    fontFamily: 'InterB',
    fontSize: fontsize.xs,
  }
});

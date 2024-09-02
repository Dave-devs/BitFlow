import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
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
import { logoImageUrl } from '@/src/constants/images';
import { defaultStyles } from '@/src/constants/styles';
import logoImage from '@/assets/images/logo.png';
import AuthSeparator from '@/src/components/AuthSeparator';
import AuthButton from '@/src/components/AuthButton';
import Button from '@/src/components/Button';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const router = useRouter();

  const [name, setName] = useState<string>('');
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
            Welcome, let's get started

          </Text>
          <Text
            style={[styles.subHeaderText, { color: activeColors.greyText }]}
          >
            Enter your credentials to get started
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.titleText, { color: activeColors.greyText }]}>
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            numberOfLines={1}
            inputMode='text'
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
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            numberOfLines={1}
            inputMode="email"
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
            placeholder="Password"
            numberOfLines={1}
            inputMode='text'
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
          <Text style={[styles.acctText, { color: activeColors.greyText }]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={[styles.signupText, { color: activeColors.primary }]}>Login</Text>
          </TouchableOpacity>
        </View>

        <Button text="Register" onPress={() => router.push('/otp')} />
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

export default RegisterScreen;

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
    fontFamily: 'InterBold',
    fontSize: fontsize.lg
  },
  subHeaderText: {
    fontFamily: 'InterRegular',
    fontSize: fontsize.xs
  },
  inputContainer: {
    gap: 5,
    paddingBottom: 20
  },
  titleText: {
    fontFamily: 'InterRegular',
    fontSize: fontsize.xs
  },
  textInput: {
    height: hp('5.6%'),
    width: wp('90%'),
    fontFamily: 'InterRegular',
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
    fontFamily: 'InterRegular',
    fontSize: 10,
  },
  signupText: {
    fontFamily: 'InterBold',
    fontSize: fontsize.xs,
  }
});

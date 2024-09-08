import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import React from 'react';
import { fontsize } from '@/src/constants/tokens';
import useTheme from '@/src/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

type ButtonProps = {
  text: string;
  onPress: () => void;
  top?: any;
  bottom?: any;
  left?: any;
  right?: any;
};

const Button = ({ text, onPress, top, bottom, left, right }: ButtonProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: activeColors.accent }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: activeColors.text }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: hp('5.6%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: fontsize.sm
  }
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import useTheme from '@/src/hooks/useTheme';
import { fontsize } from '@/src/constants/tokens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
type AuthButtonProps = {
  icon: string;
  text: string;
  onPress: () => void;
};

const AuthButton = ({ icon, text, onPress }: AuthButtonProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: activeColors.tile }]}
      onPress={onPress}
    >
      <View style={{ ...styles.textContainer }}>
        <FontAwesome5 name={icon} size={18} color={activeColors.greyText} />
        <Text style={[styles.text, { color: activeColors.text }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    height: hp('5.6%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  text: {
    fontFamily: 'interB',
    fontSize: fontsize.xs
  }
});

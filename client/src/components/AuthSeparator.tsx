import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontsize } from '@/src/constants/tokens';
import useTheme from '@/src/hooks/useTheme';

const AuthSeparator = () => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={[styles.text, { color: activeColors.greyText }]}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

export default AuthSeparator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30
  },
  line: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 10
  }
});

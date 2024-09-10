import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoginScreen from '../app/(auths)/login';
import useTheme from '../hooks/useTheme';
import { fontsize } from '../constants/tokens';

type ErrorMaskProps = {
  error: string;
};

const ErrorMask = ({ error }: ErrorMaskProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {error && (
        <View
          style={[styles.textContainer, { backgroundColor: activeColors.text }]}
        >
         
          <Text style={[styles.text, { color: activeColors.background }]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ErrorMask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    height: 130,
    width: 200,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10
  },
  text: {
    fontFamily: 'InterB',
    fontSize: fontsize.xs
  }
});

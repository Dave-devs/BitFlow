import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';
import { defaultStyles } from '../constants/styles';

type LoadinMaskProps = {
  loading?: boolean;
  text: string;
};

const LoadingMask = ({ loading, text }: LoadinMaskProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      {loading && (
        <View style={[defaultStyles.loadingBox, {backgroundColor: activeColors.text}]}>
          <ActivityIndicator size="large" color={activeColors.primary} />
          <Text style={[defaultStyles.loadingText, { color: activeColors.background }]}>
            {text}
          </Text>
        </View>
      )}
    </View>
  );
};

export default LoadingMask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

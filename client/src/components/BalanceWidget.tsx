import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { fontsize } from '../constants/tokens';
import useTheme from '../hooks/useTheme';

type BalanceWidgetProps = {
  label: string;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
};

const BalanceWidget = ({ label, icon, onPress }: BalanceWidgetProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.circle, { backgroundColor: activeColors.grey }]}>
        <Ionicons name={icon} size={24} color={activeColors.text} />
      </View>
      <Text style={[styles.label, { color: 'white' }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BalanceWidget;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 5
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'interM',
    fontSize: fontsize.xs
  }
});

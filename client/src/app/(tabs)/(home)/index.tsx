import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const {top} = useSafeAreaInsets()
  return (
    <ScrollView style={[defaultStyles.container, { backgroundColor: activeColors.background, paddingTop: top }]}>
      {/* Price Tile */}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})
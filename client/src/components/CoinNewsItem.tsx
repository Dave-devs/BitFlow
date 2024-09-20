import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useTheme from '../hooks/useTheme';

const CoinNewsItem = () => {
    const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  return (
    <View>
      <Text>CoinNewsItem</Text>
    </View>
  )
}

export default CoinNewsItem

const styles = StyleSheet.create({})
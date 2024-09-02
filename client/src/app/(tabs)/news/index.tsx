import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';

const NewsScreen = () => {
    const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
    return (
        <View style={[defaultStyles.container, { backgroundColor: activeColors.background }]}>
            <Text>NewsScreen</Text>
        </View>
    )
}

export default NewsScreen

const styles = StyleSheet.create({

})
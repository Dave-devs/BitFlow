import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import CustomHeader from '@/src/components/CustomHeader';
import useTheme from '@/src/hooks/useTheme';

const HomeScreenStack = () => {
  const { activeColors } = useTheme();
  return (
    <Stack screenOptions={{
      animationDuration: 300,
      animationTypeForReplace: 'pop',
      gestureDirection: 'horizontal',
      gestureEnabled: true,
      animation: 'slide_from_right',
    }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: '',
          header: () => <CustomHeader />
        }}
      />
      <Stack.Screen
        name="coin-details"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default HomeScreenStack;

const styles = StyleSheet.create({});

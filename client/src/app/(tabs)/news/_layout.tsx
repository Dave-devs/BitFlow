import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import useTheme from '@/src/hooks/useTheme';

const NewsScreenStack = () => {
  const {activeColors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: activeColors.text,
          fontFamily: 'interB'
        },
        headerStyle: {
          backgroundColor: activeColors.background
        }
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: 'News' }}
      />
    </Stack>
  );
};

export default NewsScreenStack;

const styles = StyleSheet.create({});

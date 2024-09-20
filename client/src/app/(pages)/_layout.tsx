import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationDuration: 300,
        animationTypeForReplace: 'pop',
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen
        name="details"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});

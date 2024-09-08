import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import CustomHeader from '@/src/components/CustomHeader';

const HomeScreenStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: '',
          header: () => <CustomHeader />
        }}
      />
    </Stack>
  );
};

export default HomeScreenStack;

const styles = StyleSheet.create({});

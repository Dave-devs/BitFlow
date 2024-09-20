import { StyleSheet } from 'react-native';
import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import useTheme from '@/src/hooks/useTheme';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const MarketScreenStack = () => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: activeColors.text,
        tabBarInactiveTintColor: activeColors.grey,
        tabBarStyle: {
          backgroundColor: activeColors.background,
        },
        tabBarIndicatorStyle: {
          backgroundColor: activeColors.primary
        },
        tabBarLabelStyle: {
          fontFamily: 'InterSB',
          fontSize: 13,
          textTransform: 'capitalize'
        }
      }}
    >
      <MaterialTopTabs.Screen name="all" options={{ title: 'All' }} />
      <MaterialTopTabs.Screen name="gainers" options={{ title: 'Gainers' }} />
      <MaterialTopTabs.Screen name="losers" options={{ title: 'Losers' }} />
    </MaterialTopTabs>
  );
};

export default MarketScreenStack;

const styles = StyleSheet.create({});

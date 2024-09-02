import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import {
  homeActiveIconUrl,
  homeInactiveIconUrl,
  marketActiveIconUrl,
  marketInactiveIconUrl,
  newsActiveIconUrl,
  newsInactiveIconUrl,
  profileActiveIconUrl,
  profileInactiveIconUrl,
  searchActiveIconUrl,
  searchInactiveIconUrl
} from '@/src/constants/images';
import { defaultStyles } from '@/src/constants/styles';
import useTheme from '@/src/hooks/useTheme';
import { BlurView } from 'expo-blur';

const TabsNavigation = () => {
  const { activeColors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarActiveTintColor: activeColors.primary,
        tabBarInactiveTintColor: activeColors.greyText,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            style={{ flex: 1, backgroundColor: activeColors.background }}
          />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          borderTopWidth: 0
        }
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={{ uri: homeActiveIconUrl }}
                tintColor={color}
                style={{ ...defaultStyles.image }}
              />
            ) : (
              <Image
                source={{ uri: homeInactiveIconUrl }}
                tintColor={color}
                style={{ ...defaultStyles.image }}
              />
            )
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={{ uri: marketActiveIconUrl }}
                tintColor={color}
                style={{ ...defaultStyles.image }}
              />
            ) : (
              <Image
                source={{ uri: marketInactiveIconUrl }}
                tintColor={activeColors.greyText}
                style={{ ...defaultStyles.image }}
              />
            )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={{ uri: searchActiveIconUrl }}
                tintColor={color}
                style={{ ...defaultStyles.image }}
              />
            ) : (
              <Image
                source={{ uri: searchInactiveIconUrl }}
                tintColor={activeColors.greyText}
                style={{ ...defaultStyles.image }}
              />
            )
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={{ uri: newsActiveIconUrl }}
                tintColor={color}
                style={{ ...defaultStyles.image }}
              />
            ) : (
              <Image
                source={{ uri: newsInactiveIconUrl }}
                tintColor={activeColors.greyText}
                style={{ ...defaultStyles.image }}
              />
            )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={{ uri: profileActiveIconUrl }}
                tintColor={color}
                style={{ ...defaultStyles.image }}
              />
            ) : (
              <Image
                source={{ uri: profileInactiveIconUrl }}
                tintColor={activeColors.greyText}
                style={{ ...defaultStyles.image }}
              />
            )
        }}
      />
    </Tabs>
  );
};

export default TabsNavigation;

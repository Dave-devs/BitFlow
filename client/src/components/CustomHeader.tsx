import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { placeholderImageUrl } from '../constants/images';

const CustomHeader = () => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, backgroundColor: activeColors.background }
      ]}
    >
      {/* Avatar */}
      <View
        style={[styles.avatarContainer, { borderColor: activeColors.primary }]}
      >
        <Image
          source={{ uri: placeholderImageUrl }}
          tintColor={'lightgrey'}
          style={styles.avatar}
        />
      </View>
      {/* Two Icons */}
      <View style={styles.iconContainer}>
        <TouchableWithoutFeedback>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={18}
            color={activeColors.text}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <MaterialIcons
            name="notifications"
            size={20}
            color={activeColors.text}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    aspectRatio: 1,
    borderRadius: 50
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40
  }
});

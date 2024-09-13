import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import useTheme from '@/src/hooks/useTheme';
import { fontsize } from '../constants/tokens';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type CoinDetailsHeaderProps = {
  symbol: string | undefined;
  price: string | undefined;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
};

const CoinDetailsHeader = ({
  symbol,
  price,
  leftIconClick,
  rightIconClick
}: CoinDetailsHeaderProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <TouchableOpacity onPress={leftIconClick} style={[styles.arrowContainer, {borderColor: activeColors.primary}]}>
        <Feather name="arrow-left" size={24} color={activeColors.greyText} />
      </TouchableOpacity>

      <View style={styles.symbolContainer}>
        <Text style={[styles.symbol, { color: activeColors.text }]}>
          {symbol ?? ''}
        </Text>
        <Text style={[styles.price, { color: activeColors.text }]}>
          {price ?? '0'}
        </Text>
      </View>

      <TouchableOpacity onPress={rightIconClick} style={[styles.arrowContainer, {borderColor: activeColors.primary}]}>
        <FontAwesome6 name="ellipsis" size={24} color={activeColors.greyText} />
      </TouchableOpacity>
    </View>
  );
};

export default CoinDetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  arrowContainer: {
    height: 35,
    width: 35,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 5
  },
  symbol: {
    fontFamily: 'InterB',
    fontSize: fontsize.sm
  },
  price: {
    fontFamily: 'InterB',
    fontSize: fontsize.xs
  }
});

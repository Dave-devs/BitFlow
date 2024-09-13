import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontsize } from '../constants/tokens';
import useTheme from '../hooks/useTheme';

type CoinDetailItemProps = {
  title: string;
  data: string | undefined;
};

const CoinDetailItem = ({ title, data }: CoinDetailItemProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.textOne, { color: activeColors.text }]}>
        {title}
      </Text>
      <Text style={[styles.textTwo, { color: activeColors.greyText }]}>
        {data ?? '0'}
      </Text>
    </View>
  );
};

export default CoinDetailItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16
  },
  textOne: {
    fontFamily: 'InterM',
    fontSize: fontsize.xs
  },
  textTwo: {
    fontFamily: 'InterR',
    fontSize: fontsize.xs
  }
});

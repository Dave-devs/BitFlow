import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import { fontsize } from '../constants/tokens';

type TransactionTileProps = {
  id: string;
  icon: typeof Ionicons.defaultProps;
  color?: string;
  amount: number;
  title: string;
  date: Date;
};

const TransactionTile = ({
  id,
  icon,
  amount,
  color,
  title,
  date
}: TransactionTileProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <View key={id} style={styles.transactionContainer}>
      <View
        style={[styles.circle, { backgroundColor: activeColors.background }]}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: color }]}>
          ${amount}
        </Text>
        <Text style={[styles.title, { color: activeColors.greyText }]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.date, { color: activeColors.greyText }]}>
        {date.toLocaleDateString()}
      </Text>
    </View>
  );
};

export default TransactionTile;

const styles = StyleSheet.create({
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountContainer: {
    flex: 1
  },
  amount: {
    fontFamily: 'Inter-ExtraBold',
      fontSize: fontsize.sm
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: fontsize.xs
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: fontsize.xs
  }
});

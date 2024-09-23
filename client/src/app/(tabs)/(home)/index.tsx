import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useReduxHook';
import {
  selectTransactions,
  selectBalance,
  Transaction,
  runTransaction,
  clearTransactions
} from '@/src/slices/transactionSlice';
import BalanceWidget from '@/src/components/BalanceWidget';
import TransactionTile from '@/src/components/TransactionTile';
import { fontsize } from '@/src/constants/tokens';
import useFetchQuery from '@/src/hooks/useFetchQuery';
import { CoinList } from '@/src/utils/CoinList';
import LoadingMask from '../../../components/LoadingMask';
import CoinListItem from '@/src/components/CoinListItem';
import ErrorMask from '@/src/components/ErrorMask';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const { top } = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const balance = useAppSelector(selectBalance);

  const handleRunTransaction = () => {
    const transaction: Transaction = {
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1), // Random high/low amount
      date: new Date(),
      title: 'Added money'
    };
    dispatch(runTransaction(transaction));
  };

  const handleClearTransactions = () => {
    dispatch(clearTransactions());
  };

  // Fetch Coin List
  const url =
    process.env.EXPO_PUBLIC_COINRANKING_API_URL +
    '/coins?referenceCurrencyUuid=5k-_VTxqtCEI&limit=8';
  const options = {
    method: 'GET',
    headers: {
      'x-access-token': process.env.EXPO_PUBLIC_COINRANKING_API_KEY
    }
  };

  const { data, loading, error, refetch } = useFetchQuery<CoinList>(
    'coins',
    url,
    options
  );
  // Ensure coins data is extracted properly
  const coins = data?.data?.coins || [];

  return (
    <>
      <ScrollView
        style={[
          defaultStyles.container,
          {
            backgroundColor: activeColors.background,
            paddingTop: top,
            paddingBottom: 100
          }
        ]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={[styles.balanceContainer]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Text style={[styles.balance, { color: activeColors.text }]}>
              {balance}
            </Text>
            <Text style={[styles.sign, { color: activeColors.text }]}>$</Text>
          </View>
        </View>
        {/* Rounded Buttons */}
        <View style={styles.balanceWidgetContainer}>
          <BalanceWidget
            label={'Deposit'}
            icon={'add'}
            onPress={handleRunTransaction}
          />
          <BalanceWidget
            label={'Exchange'}
            icon={'refresh'}
            onPress={handleClearTransactions}
          />
          <BalanceWidget label={'List'} icon={'list'} />
          <BalanceWidget label={'More'} icon={'ellipsis-horizontal'} />
        </View>

        {/* Transaction History */}
        <View style={styles.transactionWrapperContainer}>
          <Text
            style={[styles.transactionHeaderText, { color: activeColors.text }]}
          >
            Fiat Transaction History
          </Text>

          <View
            style={[
              styles.transactionContainer,
              { backgroundColor: activeColors.tile }
            ]}
          >
            {transactions.length === 0 && (
              <Text
                style={[styles.noTransactionText, { color: activeColors.text }]}
              >
                No transactions yet
              </Text>
            )}

            {transactions
              .map((transaction) => (
                <TransactionTile
                  id={transaction.id}
                  icon={transaction.amount > 0 ? 'add' : 'remove'}
                  amount={transaction.amount}
                  title={transaction.title}
                  date={transaction.date}
                  color={transaction.amount > 0 ? 'green' : 'red'}
                />
              ))
              .reverse()}
          </View>
        </View>

        {/* Display Coin List */}
        <View style={styles.coinlistContainer}>
          <Text
            style={[styles.transactionHeaderText, { color: activeColors.text }]}
          >
            Coins
          </Text>
        </View>
        {coins.length > 0 && <CoinListItem coins={coins} />}
      </ScrollView>
      {/* Show Loading Tile */}
      {loading && <LoadingMask loading={loading} text={'Loading...'} />}
      {/* Show Error Tile */}
      {error && <ErrorMask error={error.message} />}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: 'center',
    paddingBottom: 50
  },
  sign: {
    fontFamily: 'inter',
    fontSize: fontsize.base,
    alignSelf: 'flex-end'
  },
  balance: {
    fontFamily: 'interEB',
    fontSize: fontsize.xxl
  },
  balanceWidgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  transactionWrapperContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  transactionHeaderText: {
    fontFamily: 'interSB',
    fontSize: fontsize.base
  },
  transactionContainer: {
    padding: 10,
    marginTop: 10,
    gap: 10,
    borderRadius: 4
  },
  noTransactionText: {
    fontFamily: 'inter',
    fontSize: fontsize.xs
  },
  sortableContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  coinlistContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20
  }
});

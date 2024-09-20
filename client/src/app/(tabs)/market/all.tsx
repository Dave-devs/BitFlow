import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFetchQuery from '@/src/hooks/useFetchQuery';
import { CoinList } from '@/src/utils/CoinList';
import LoadingMask from '@/src/components/LoadingMask';
import ErrorMask from '@/src/components/ErrorMask';
import CoinListItem from '@/src/components/CoinListItem';

const Page = () => {
  const insets = useSafeAreaInsets();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  // Fetch Coin List
  const url =
    process.env.EXPO_PUBLIC_COINRANKING_API_URL +
    '/coins?referenceCurrencyUuid=5k-_VTxqtCEI';

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
    <ScrollView
      style={[
        defaultStyles.container,
        { backgroundColor: activeColors.background, paddingVertical: 20 }
      ]}
    >
      {/* Show Loading Tile */}
      {loading && <LoadingMask loading={loading} text={'Loading...'} />}
      {/* Show Error Tile */}
      {error && <ErrorMask error={error.message} />}
      {/* Show Coin List */}
      {coins.length > 0 && <CoinListItem coins={coins} />}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});

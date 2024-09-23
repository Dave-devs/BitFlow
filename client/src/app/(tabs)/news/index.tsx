import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';
import useFetchQuery from '@/src/hooks/useFetchQuery';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CoinNews } from '@/src/utils/CoinNewsList';
import LoadingMask from '@/src/components/LoadingMask';
import ErrorMask from '@/src/components/ErrorMask';
import CoinNewsItem from '@/src/components/CoinNewsItem';

const NewsScreen = () => {
  const insets = useSafeAreaInsets();
  const { activeColors } = useTheme();

  // Fetch Coin List
  const url = process.env.EXPO_PUBLIC_COINTELEGRAPH_API_URL as string;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.EXPO_PUBLIC_COINTELEGRAPH_API_KEY,
      'x-rapidapi-host': process.env.EXPO_PUBLIC_COINTELEGRAPH_HOST
    }
  };

  const { data, loading, error, refetch } = useFetchQuery<CoinNews>(
    'fetch-coin-news',
    url,
    options
  );

  //   console.log('News List', data);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={[
        defaultStyles.container,
        {
          backgroundColor: activeColors.background,
          paddingVertical: insets.top
        }
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      //   contentContainerStyle={styles.container}
    >
      {/* Show Loading Mask */}
      {loading && <LoadingMask loading={loading} text={'Loading...'} />}

      {/* Show Error Mask */}
      {error && <ErrorMask error={error.message} />}

      {/* Show Coin News List only if data is not null */}
      {data && Array.isArray(data) && <CoinNewsItem news={data} />}
    </ScrollView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({});

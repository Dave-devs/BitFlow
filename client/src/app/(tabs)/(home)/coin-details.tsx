import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useTheme from '@/src/hooks/useTheme';
import { fontsize } from '@/src/constants/tokens';
import useFetchQuery from '@/src/hooks/useFetchQuery';
import { Circle, useFont } from '@shopify/react-native-skia';
import { Coin, CoinDetails } from '@/src/utils/CoinDetails';
import { CoinHistories, History } from '@/src/utils/CoinHistory';
import { format } from 'date-fns';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { SharedValue } from 'react-native-reanimated';
import { defaultStyles } from '@/src/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CoinDetailsHeader from '@/src/components/CoinDetailsHeader';
import CoinDetailItem from '@/src/components/CoinDetailItem';
import numeral from 'numeral';
import SvgComponent from '@/src/components/SvgImage';

const CoinDetailScreen = () => {
  const router = useRouter();
  const { coinId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const [lineData, setLineData] = useState<{ x: number; y: number }[]>([]);
  const [item, setItem] = useState<Coin | null>(null);

  const font = useFont(
    require('../../../../assets/fonts/Inter_24pt-Bold.ttf'),
    10
  );

  const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } });

  function ToolTip({
    x,
    y
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return <Circle cx={x} cy={y} r={8} color={activeColors.red} />;
  }

  const coinDetailUrl =
    process.env.EXPO_PUBLIC_COINRANKING_API_URL + `/coin/${coinId}`;
  const coinHistoryUrl =
    process.env.EXPO_PUBLIC_COINRANKING_API_URL + `/coin/${coinId}/history`;

  const options = {
    method: 'GET',
    headers: {
      'x-access-token': process.env.EXPO_PUBLIC_COINRANKING_API_KEY
    }
  };

  // Fetch coin details
  const {
    data: coinDetailData,
    loading: coinDetailLoading,
    error: coinDetailError,
    refetch: refetchCoinDetail
  } = useFetchQuery<CoinDetails>('coin-details', coinDetailUrl, options);
  const coinDetails = coinDetailData?.data?.coin;

  // Fetch coin history
  const {
    data: coinHistoryData,
    loading: coinHistoryLoading,
    error: coinHistoryError,
    refetch: refetchCoinHistory
  } = useFetchQuery<CoinHistories>('coin-history', coinHistoryUrl, options);
  const coinHistory = coinHistoryData?.data?.history || [];

  useEffect(() => {
    if (coinDetails && coinHistory.length > 0) {
      // Format data for VictoryArea
      const formattedData = coinHistory.map((history: History) => ({
        x: history.timestamp,
        y: parseFloat(history.price)
      }));

      setLineData(formattedData);
    }

    if (coinDetails) {
      setItem(coinDetails);
    }
  }, [coinDetails, coinHistory]);

  return (
    <View
      style={[
        defaultStyles.container,
        { backgroundColor: activeColors.background, paddingTop: insets.top }
      ]}
    >
      {coinDetailLoading && coinHistoryLoading ? (
        // Show loading mask
        <View style={styles.loadingContainer}>
          <View
            style={[
              defaultStyles.loadingBox,
              { backgroundColor: activeColors.text }
            ]}
          >
            <ActivityIndicator size="large" color={activeColors.primary} />
            <Text style={[defaultStyles.loadingText, { color: activeColors.background }]}>
              Loading...
            </Text>
          </View>
        </View>
      ) : (
        <View>
          {/* Header */}
          <CoinDetailsHeader
            leftIconClick={() => router.back()}
            symbol={item?.symbol}
            price={numeral(item?.price ?? 0).format('$0.000')}
          />
          {/* Coin Item */}
          <View style={[styles.coinItemContainer]}>
            {item?.iconUrl.endsWith('.svg') && (
              <SvgComponent uri={item?.iconUrl} height={40} width={40} />
            )}
            {item?.iconUrl.endsWith('.png') && (
              <Image
                source={{
                  uri: item?.iconUrl
                }}
                style={defaultStyles.iconImage}
              />
            )}
            {item?.iconUrl.endsWith('.jpg') && (
              <Image
                source={{
                  uri: item?.iconUrl
                }}
                style={defaultStyles.iconImage}
              />
            )}

            <View style={defaultStyles.nameContainer}>
              {/* Name */}
              <Text style={[defaultStyles.name, { color: activeColors.text }]}>
                {item?.name}
              </Text>
              {/* Price & Change */}
              <View style={defaultStyles.priceContainer}>
                <Text
                  style={[
                    defaultStyles.price,
                    { color: activeColors.greyText }
                  ]}
                >
                  {numeral(parseFloat(item?.price ?? '0')).format('$0,0.00')}
                </Text>
                <Text
                  style={[
                    defaultStyles.change,
                    {
                      color:
                        parseFloat(item?.change ?? '0') < 0
                          ? activeColors.red
                          : activeColors.green
                    }
                  ]}
                >
                  {item?.change}%
                </Text>
              </View>
            </View>
            {/* Symbol */}
            <View style={defaultStyles.symbolContainer}>
              <Text
                style={[defaultStyles.symbol, { color: activeColors.text }]}
              >
                {item?.symbol}
              </Text>
              <Text
                style={[
                  defaultStyles.marketCap,
                  { color: activeColors.greyText }
                ]}
              >
                {(item?.marketCap.length ?? 0 > 9)
                  ? item?.marketCap.slice(0, 9)
                  : item?.marketCap}
              </Text>
            </View>
          </View>

          {/* Chart */}
          <View style={[styles.chartContainer]}>
            {lineData.length > 0 && (
              <CartesianChart
                chartPressState={state}
                axisOptions={{
                  font,
                  tickCount: 8,
                  labelOffset: { x: -1, y: 0 },
                  labelColor: activeColors.primary,
                  formatXLabel: (ms) => format(new Date(ms * 1000), 'MM/dd')
                }}
                data={lineData}
                xKey="x"
                yKeys={['y']}
              >
                {({ points }) => (
                  <>
                    <Line
                      points={points.y}
                      color={activeColors.text}
                      strokeWidth={1.5}
                    />
                    {isActive && (
                      <ToolTip x={state.x.position} y={state.y.y.position} />
                    )}
                  </>
                )}
              </CartesianChart>
            )}
          </View>

          {/* Detail The three Items here  */}
          <View
            style={{
              paddingVertical: 20
            }}
          >
            {item && 'allTimeHigh' in item && (
              <>
                <CoinDetailItem
                  title={'Fully Diluted MarketCap'}
                  data={numeral(item.fullyDilutedMarketCap ?? 0).format(
                    '$0.00.0'
                  )}
                />
                <CoinDetailItem
                  title={'Number of Markets'}
                  data={numeral(item.numberOfMarkets ?? 0).format('$0.00.0')}
                />
                <CoinDetailItem
                  title={'Number of Exchanges'}
                  data={numeral(item.numberOfExchanges ?? 0).format('$0.00.0')}
                />
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default CoinDetailScreen;

const styles = StyleSheet.create({
  chartContainer: {
    height: 400,
    paddingHorizontal: 15,
    overflow: 'hidden'
  },
  coinItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 15
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import numeral from 'numeral';
import useTheme from '../hooks/useTheme';
import { fontsize } from '../constants/tokens';
import SvgComponent from './SvgImage';
import { useRouter } from 'expo-router';
import { Coins } from '../utils/CoinList';
import { defaultStyles } from '../constants/styles';

type RenderItemProps = {
  item: Coins;
  index: number;
};

type CoinListItemProps = {
  coins: Array<any>;
  charts?: boolean;
  onPress?: () => void;
};

const CoinListItem = ({ coins, charts, onPress }: CoinListItemProps) => {
  const router = useRouter();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

  return (
    <FlatList
      data={coins}
      keyExtractor={(coin) => coin.uuid}
      scrollEnabled={false}
      contentContainerStyle={{ marginHorizontal: 15 }}
      renderItem={({ item, index }: RenderItemProps) => (
        <TouchableOpacity
          style={{ paddingBottom: 8 }}
          onPress={() => {
            router.push({
              pathname: '/(tabs)/(home)/coin-details',
              params: {
                coinId: item.uuid
              }
            });
          }}
          key={item.uuid}
        >
          <Animated.View
            entering={FadeInDown.duration(100)
              .delay(index * 200)
              .springify()}
            style={styles.container}
          >
            {/* Imajge */}
            {item.iconUrl.endsWith('.svg') && (
              <SvgComponent uri={item?.iconUrl} height={40} width={40} />
            )}
            {item.iconUrl.endsWith('.png') && (
              <Image
                source={{
                  uri: item?.iconUrl
                }}
                style={defaultStyles.iconImage}
              />
            )}
            {item.iconUrl.endsWith('.jpg') && (
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
                {item.name}
              </Text>
              {/* Price & Change */}
              <View style={defaultStyles.priceContainer}>
                <Text
                  style={[
                    defaultStyles.price,
                    { color: activeColors.greyText }
                  ]}
                >
                  {numeral(parseFloat(item.price)).format('$0,0.00')}
                </Text>
                <Text
                  style={[
                    defaultStyles.change,
                    {
                      color:
                        parseFloat(item.change) < 0
                          ? activeColors.red
                          : activeColors.green
                    }
                  ]}
                >
                  {item.change}%
                </Text>
              </View>
            </View>

            {/* Line chart */}
            {charts && (
              <View>
                <Text>Chart</Text>
              </View>
            )}

            {/* Symbol & Market Cap */}
            <View style={defaultStyles.symbolContainer}>
              <Text
                style={[defaultStyles.symbol, { color: activeColors.text }]}
              >
                {item.symbol}
              </Text>
              <Text
                style={[
                  defaultStyles.marketCap,
                  { color: activeColors.greyText }
                ]}
              >
                {item.marketCap.length > 9
                  ? item.marketCap.slice(0, 9)
                  : item.marketCap}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
    />
  );
};

export default CoinListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 6
  }
});

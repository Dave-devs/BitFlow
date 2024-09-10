import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React from 'react';
import { Coin } from '../utils/CoinList';
import Animated, {
  FadeInDown,
  useAnimatedStyle
} from 'react-native-reanimated';
import { placeholderImageUrl } from '../constants/images';
import numeral from 'numeral';
import useTheme from '../hooks/useTheme';
import { fontsize } from '../constants/tokens';
import Svg, { SvgProps, Path } from 'react-native-svg';
import SvgComponent from './SvgImage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RenderItemProps = {
  item: Coin;
  index: number;
};

type CoinListItemProps = {
  coins: Array<Coin>;
  charts?: boolean;
  onPress?: () => void;
};

const CoinListItem = ({ coins, charts, onPress }: CoinListItemProps) => {
  const { bottom } = useSafeAreaInsets();
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
          onPress={onPress}
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
                style={styles.image}
              />
            )}
            {item.iconUrl.endsWith('.jpg') && (
              <Image
                source={{
                  uri: item?.iconUrl
                }}
                style={styles.image}
              />
            )}

            <View style={styles.nameContainer}>
              {/* Name */}
              <Text style={[styles.name, { color: activeColors.text }]}>
                {item.name}
              </Text>
              {/* Price & Change */}
              <View style={styles.priceContainer}>
                <Text style={[styles.price, { color: activeColors.greyText }]}>
                  {numeral(parseFloat(item.price)).format('$0,0.00')}
                </Text>
                <Text
                  style={[
                    styles.change,
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
            <View style={styles.symbolContainer}>
              <Text style={[styles.symbol, { color: activeColors.text }]}>
                {item.symbol}
              </Text>
              <Text
                style={[styles.marketCap, { color: activeColors.greyText }]}
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
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 50,
    aspectRatio: 1
  },
  nameContainer: {
    width: '65%',
    gap: 2,
    alignItems: 'flex-start'
  },
  name: {
    fontFamily: 'InterB',
    fontSize: fontsize.sm
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  price: {
    fontFamily: 'InterR',
    fontSize: fontsize.xs
  },
  change: {
    fontFamily: 'InterR',
    fontSize: fontsize.xs
  },
  symbolContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  symbol: {
    fontFamily: 'InterB',
    fontSize: fontsize.sm
  },
  marketCap: {
    fontFamily: 'InterR',
    fontSize: 10,
    textAlign: 'right'
  }
});

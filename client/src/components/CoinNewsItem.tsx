import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';
import { CoinNews } from '../utils/CoinNewsList';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { fontsize } from '../constants/tokens';
import { format } from 'date-fns';

type CoinNewsItemProps = {
  news: Array<CoinNews>;
  onPress?: () => void;
};

const CoinNewsItem = ({ news, onPress }: CoinNewsItemProps) => {
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  console.log('News List ', news);
  
  return (
    <>
      {news && news.length > 0 ? (
        <FlatList
          data={news}
          scrollEnabled={true}
          keyExtractor={(item) => item.url}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={onPress}>
              <Animated.View
                entering={FadeInDown.duration(100)
                  .delay(index * 200)
                  .springify()}
                style={[styles.container]}
              >
                {item.thumbnail && (
                  <Image source={{ uri: item.thumbnail }} style={styles.image} />
                )}
                <View style={styles.descriptionBox}>
                  <Text
                    style={[styles.title, { color: activeColors.greyText }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={[
                      styles.description,
                      { color: activeColors.greyText }
                    ]}
                  >
                    {item.description}
                  </Text>
                  <Text style={[styles.date, { color: activeColors.greyText }]}>
                    {format(new Date(item.createdAt), 'MM/dd')}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No news to display</Text>
      )}
    </>
  );
};

export default CoinNewsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10
  },
  image: {
    width: 130,
    height: 50,
    resizeMode: 'contain'
  },
  descriptionBox: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 10
  },
  title: {
    fontFamily: 'interM',
    fontSize: fontsize.sm
  },
  description: {
    fontFamily: 'inter',
    fontSize: 11
  },
  date: {
    fontFamily: 'inter',
    fontSize: 11
  }
});

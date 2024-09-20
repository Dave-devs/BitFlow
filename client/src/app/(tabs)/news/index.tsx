import { ScrollView, StyleSheet,} from 'react-native'
import React from 'react'
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
    const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();

    // Fetch Coin List
    const url = process.env.EXPO_PUBLIC_COINDESK_API_URL as string

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.EXPO_PUBLIC_COINDESK_API_KEY,
            'x-rapidapi-host': process.env.EXPO_PUBLIC_COINDESK_HOST
        }
    };

    const { data, loading, error, refetch } = useFetchQuery<CoinNews>(
        'coin-news',
        url,
        options
    );

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
            {data && <CoinNewsItem /> }
        </ScrollView>
    )
}

export default NewsScreen

const styles = StyleSheet.create({

})
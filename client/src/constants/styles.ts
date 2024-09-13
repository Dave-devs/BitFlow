import { StyleSheet } from 'react-native';
import { fontsize } from './tokens';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  headerTextContainer: {
    alignSelf: 'flex-start',
    paddingBottom: 30
  },
  headerText: {
    fontFamily: 'InterBold',
    fontSize: fontsize.lg
  },
  subHeaderText: {
    fontFamily: 'InterRegular',
    fontSize: fontsize.xs
  },
  iconImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 50
  },
  nameContainer: {
    width: '60%',
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
  },
  loadingBox: {
    height: 130,
    width: 200,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10
  },
  loadingText: {
    fontFamily: 'InterB',
    fontSize: fontsize.base
  }
});

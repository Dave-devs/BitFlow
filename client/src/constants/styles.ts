import {StyleSheet} from 'react-native'
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
  }
});
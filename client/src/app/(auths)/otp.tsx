import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { Fragment, useState } from 'react';
import { useRouter } from 'expo-router';
import useTheme from '@/src/hooks/useTheme';
import { defaultStyles } from '@/src/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { fontsize } from '@/src/constants/tokens';
import Button from '@/src/components/Button';

const CELL_COUNT = 6;

const OtpScreen = () => {
  const insets = useSafeAreaInsets();
  const { activeMode, activeColors, isDarkMode, switchMode } = useTheme();
  const router = useRouter();

  const [code, setCode] = useState<string>('');

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode
  });

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <KeyboardAvoidingView>
        <View
          style={[
            defaultStyles.headerTextContainer,
            { paddingTop: insets.top + 60 }
          ]}
        >
          <Text
            style={[defaultStyles.headerText, { color: activeColors.text }]}
          >
            Enter Authentication Code
          </Text>
          <Text
            style={[
              defaultStyles.subHeaderText,
              { color: activeColors.greyText }
            ]}
          >
            We have sent an authentication code to your email
          </Text>
        </View>

        {/* Token TextInput */}
        <View style={{alignSelf: 'center'}}>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            caretHidden={false}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[
                    styles.cellRoot,
                    isFocused && styles.focusCell,
                    { backgroundColor: activeColors.tile, borderColor: activeColors.primary }
                  ]}
                >
                  <Text style={[styles.cellText, { color: activeColors.text }]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
                {index === 2 ? (
                  <View key={`separator-${index}`} style={styles.separator} />
                ) : null}
              </Fragment>
            )}
          />
        </View>
        {/* Resend Text */}
        <View style={styles.dontReceiveContainer}>
          <Text style={[styles.dontReceiveText, {color: activeColors.greyText}]}>Don't receive code?</Text>
          <TouchableOpacity>
            <Text style={[styles.resendText, { color: activeColors.primary }]}>Resend</Text>
          </TouchableOpacity>
        </View>

        <Button text="Verify Email" onPress={() => {}} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12
  },
  cellRoot: {
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  cellText: {
    fontFamily: 'InterRegular',
    fontSize: fontsize.sm,
    textAlign: 'center'
  },
  focusCell: {
    paddingBottom: 8,
    borderWidth: 1,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: 'grey',
    alignSelf: 'center'
  },
  dontReceiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingBottom: 20,
  },
  dontReceiveText: {
    fontFamily: 'InterRegular',
    fontSize: 10,
  },
  resendText: {
    fontFamily: 'InterBold',
    fontSize: fontsize.xs,
  }
});

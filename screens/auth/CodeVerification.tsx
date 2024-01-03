import { OtpInput } from 'react-native-otp-entry';
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import { ROUTES } from '../../constants';

export default function CodeVerification() {
  const navigation = useNavigation<ScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Kod Ekraı'
    })
  }, [])

  function handleOnFill() {
    console.log('filled')
    navigation.navigate(ROUTES.NEW_PASSWORD)
  }

  return (
    <>
      <Text style={styles.textWrapper}>Lütfen Gelen Kodu Giriniz</Text>
      <OtpInput
        onFilled={handleOnFill}
        autoFocus={false}
        focusColor={'orange'}
        theme={{ containerStyle: styles.containerStyle }}
        numberOfDigits={6}
        // onTextChange={(text) => console.log(text)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 40,
    alignSelf: 'center',
    width: 330
  },
  textWrapper: {
    alignSelf: 'center',
    marginVertical: 40,
    fontSize: 20,
    fontWeight: 'bold'
  }
})
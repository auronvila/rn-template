import { OtpInput } from 'react-native-otp-entry';
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import { ROUTES } from '../../constants';
import axios from 'axios';

export default function CodeVerification() {
  const navigation = useNavigation<ScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Kod Ekranı'
    })
  }, [])

  async function handleOnFill(data: string) {
    const dto = {
      code: data,
    }

    try {
      const response = await axios(`${process.env.EXPO_PUBLIC_API_URL}/auth/check-validation-code`, {
        method: 'POST',
        data: dto,
        headers: {
          'Content-type': 'application/json'
        }
      });
      navigation.navigate(ROUTES.NEW_PASSWORD, { code: data })

    } catch (e:any) {
      console.log('error---->', e.response);
      alert(e.response.data.message)
    }
  }

  return (
    <>
      <Text style={styles.textWrapper}>Lütfen Gelen Kodu Giriniz</Text>
      <OtpInput
        onFilled={handleOnFill}
        autoFocus={false}
        focusColor={'orange'}
        theme={{ containerStyle: styles.containerStyle }}
        numberOfDigits={4}
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
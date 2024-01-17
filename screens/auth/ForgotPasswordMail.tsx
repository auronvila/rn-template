import { StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomButton from '../../components/Button';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import AlertDialog from '../../components/AlertDialog';
import axios from 'axios/index';
import { ROUTES } from '../../constants';

const validationSchema = yup.object().shape({
  email: yup.string().required('Lütfen mail adresi giriniz').email('Lütfen geçerli bir mail adresi giriniz')
});


export default function ForgotPasswordMail() {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigation = useNavigation<ScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Parolamı Unuttum'
    })
  }, [])

  const onSubmit = async (data: { email: string }) => {
    const dto = {
      email_address: data.email
    }
    try {
      const response = await axios(`${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password/email-address`, {
        method: 'POST',
        data: dto,
        headers: {
          'Content-type': 'application/json'
        }
      });
      setAlertMessage('Lütfen girdiğniz mail adresini kontrol edin ve oradan devam edin.')
      console.log(response)
    } catch (e:any) {
      console.log('error---->', e.response);
      alert(e.response.data.message)
    }
  };

  return (
    <>
      <View style={styles.inputWrapper}>
        <Text style={styles.headerWrapper}>Lütfen kulandığnız mail adresinizi giriniz</Text>
        <View style={styles.input}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name={'email'}
                defaultValue={''}
                isInvalid={!!errors.email}
                label="mail adresi"
                keyboardType="email-address"
                secure={false}
                control={control}
                errorText={errors.email?.message}
              />
            )}
            name="email"
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton onPress={handleSubmit(onSubmit)}>Onayla</CustomButton>
      </View>
      <AlertDialog message={alertMessage} onClose={() => {
        navigation.navigate(ROUTES.SIGN_IN)
        setAlertMessage('')
      }}/>
    </>
  )
}
const styles = StyleSheet.create({
  inputWrapper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  headerWrapper: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 15
  },
  input: {
    marginVertical: 25
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    marginRight: 30
  }
})

import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import Input from '../../components/Input';
import { ROUTES } from '../../constants';
import CustomButton from '../../components/Button';
import { useLayoutEffect } from 'react';

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().matches(/^\d+$/, 'Phone number must contain only digits').required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function SignUpScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigation = useNavigation<ScreenProp>();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Kayıt Ol'
    })
  }, [])

  function handleSignUp(data) {
    console.log(data)
    navigation.replace(ROUTES.ACCOUNT_TYPE, { data: data })
  }

  return (
    <ScrollView style={{ width: '90%', alignSelf: 'center' }}>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secure={false}
              keyboardType={'default'}
              name={'fullName'}
              defaultValue={''}
              isInvalid={!!errors.fullName}
              label="isim & soyİsim"
              control={control}
              errorText={errors.fullName?.message}
            />
          )}
          name="fullName"
          defaultValue=""
        />
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
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              control={control}
              name={'phoneNumber'}
              defaultValue={''}
              isInvalid={!!errors.phoneNumber}
              label="telefon numarası"
              keyboardType="numeric"
              secure={false}
              errorText={errors.phoneNumber?.message}
            />
          )}
          name="phoneNumber"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name={'password'}
              defaultValue={''}
              isInvalid={!!errors.password}
              label="parola"
              keyboardType="default"
              secure={true}
              control={control}
              errorText={errors.password?.message}
            />
          )}
          name="password"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name={'verifyPassword'}
              defaultValue={''}
              isInvalid={!!errors.verifyPassword}
              label="parolayı dogrula"
              keyboardType="default"
              secure={true}
              control={control}
              errorText={errors.verifyPassword?.message}
            />
          )}
          name="verifyPassword"
          defaultValue=""
        />
      </View>
      <CustomButton styles={styles.button} onPress={handleSubmit(handleSignUp)}>Kayıt Oluştur</CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight:20,
    width: 140,
    alignSelf: 'flex-end',
    marginTop: 10
  },
  inputWrapper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

import { StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomButton from '../../components/Button';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import { ROUTES } from '../../constants';
import AlertDialog from '../../components/AlertDialog';

const validationSchema = yup.object().shape({
  phoneNumber: yup.number()
    .required('Lütfen kulandığnız telefon numarasını giriniz')
    .test('len', 'telefon numarasının 10 karakterden oluşması lazım', (value) => {
      return String(value).length === 10;
    })
});


export default function ForgotPasswordNumber() {
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

  const onSubmit = async (data: { phoneNumber: number }) => {
    setAlertMessage('Lütfen girdiğniz telefon numarasını kontrol edin.')
    console.log(data)
  };

  return (
    <>
      <View style={styles.inputWrapper}>
        <Text style={styles.headerWrapper}>Lütfen kulandığnız telefon numarasını giriniz</Text>
        <View style={styles.input}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name={'phoneNumber'}
                defaultValue={''}
                isInvalid={!!errors.phoneNumber}
                label="telefon numarası"
                keyboardType="numeric"
                secure={false}
                control={control}
                errorText={errors.phoneNumber?.message}
              />
            )}
            name="phoneNumber"
          />
        </View>
      </View>
      <Text onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD_EMAIL)} style={styles.forgotPassword}>Mail ile
        Güncelle</Text>
      <View style={styles.buttonWrapper}>
        <CustomButton onPress={handleSubmit(onSubmit)}>Onayla</CustomButton>
      </View>
      <AlertDialog message={alertMessage} onClose={() => {
        setAlertMessage('')
        navigation.navigate(ROUTES.CODE_VERIFICATION)
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
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    color: 'blue',
    marginLeft: 30
  }
})

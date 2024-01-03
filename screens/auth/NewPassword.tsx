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
  password: yup.string().required('Lütfen parola giriniz').min(6, 'Parola en az 6 karakterden oluşmalıdır')

});


export default function NewPassword() {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigation = useNavigation<ScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Yeni Parola',
      headerLeft: () => <></>,
      gestureEnabled: false
    })
  }, [])

  const onSubmit = async (data: { password: string }) => {
    console.log(data)
    navigation.navigate(ROUTES.SIGN_IN)
  };

  return (
    <>
      <View style={styles.inputWrapper}>
        <Text style={styles.headerWrapper}>Lütfen güncel parolanızı giriniz</Text>
        <View style={styles.input}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                name={'password'}
                defaultValue={''}
                isInvalid={!!errors.password}
                label="Yeni parola"
                keyboardType="default"
                secure={true}
                control={control}
                errorText={errors.password?.message}
              />
            )}
            name="password"
          />
        </View>
      </View>
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

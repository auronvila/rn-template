import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import Input from '../../components/Input';
import { ROUTES } from '../../constants';
import CustomButton from '../../components/Button';
import { useContext, useLayoutEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import AlertDialog from '../../components/AlertDialog';
import { AuthContext } from '../../store/auth';

type ChangePasswordReqDto = {
  verifyPassword?: string,
  password: string
}

const validationSchema = yup.object().shape({
  password: yup.string().min(6, 'Parola en az 6 karakterden oluşmalıdır').required('Lütfen parola giriniz'),
  verifyPassword: yup.string().oneOf([yup.ref('password')], 'Parolalar eşleşmıyor')
});

export default function ChangePassword() {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { updateAuth } = useContext(AuthContext)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigation = useNavigation<ScreenProp>();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Parolanı Güncelle'
    })
  }, [])

  async function handleSignUp(data: ChangePasswordReqDto) {
    try {
      await UserService.changePassword(data.password)
      setAlertMessage('Parolanız başarılı bir şekilde güncellenmiştir lütfen güncel parola ile tekrar giriş yapınız')
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  return (
    <ScrollView style={{ width: '90%', alignSelf: 'center' }}>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name={'password'}
              defaultValue={''}
              isInvalid={!!errors.password}
              label="yeni parola"
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
              label="yeni parolayı dogrula"
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
      <CustomButton styles={styles.button} onPress={handleSubmit(handleSignUp)}>Güncelle</CustomButton>
      <AlertDialog message={alertMessage} onClose={() => {
        setAlertMessage('')
        updateAuth(null, null)
      }}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
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

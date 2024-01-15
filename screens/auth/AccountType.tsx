import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {ScreenProp} from '../publicScreens/WelcomeScreen';
import {ROUTES} from '../../constants';
import CustomButton from '../../components/Button';
import axios, {AxiosResponse} from 'axios';
import {SignUpReqDto} from '../../services/dto/Auth';
import {AuthContext} from '../../store/auth';
import AlertDialog from '../../components/AlertDialog';

type SignUpFormValues = {
  data: {
    email: string,
    fullName: string,
    password: string,
    phoneNumber: number,
    verifyPassword: string
  }
}

export type RootStackParamList = {
  AccountType: SignUpFormValues;
};

export default function AccountType() {
  const data = useRoute<RouteProp<RootStackParamList, 'AccountType'>>();
  const {updateAuth} = useContext(AuthContext)
  const navigation = useNavigation<ScreenProp>();
  const [alertMessage, setAlertMessage] = useState<string>('')


  async function getServiceHandler(userRoleValue: number) {
    const dto = {
      fullname: data.params.data.fullName,
      email_address: data.params.data.email,
      password: data.params.data.password,
      phone_number: data.params.data.phoneNumber,
      role: userRoleValue
    } as SignUpReqDto
    try {
      const response: AxiosResponse<SignUpReqDto, void> = await axios(`${process.env.EXPO_PUBLIC_API_URL}/auth/sign-up`, {
        method: 'POST',
        data: dto,
        headers: {
          'Content-type': 'application/json'
        }
      });
      // todo info ekranina yonlendir
      setAlertMessage('kulanıcı başarılı bir şekilde oluşmuştur lütfen yazdıgnız bilgiler ile giriş yapın');

    } catch (e) {
      console.log('error---->', e.response);
      alert(e.response.data.message)
      return
    }
  }


  return (
    <SafeAreaView style={{top: 70}}>
      <Text style={styles.mainText}>Lütfen Bir Hesap Türü Seçin</Text>
      <View style={styles.buttonWrapper}>
        <CustomButton onPress={() => getServiceHandler(0)}>Kulanıcı</CustomButton>
        <CustomButton styles={{marginHorizontal: 15}} onPress={() => getServiceHandler(1)}>Taşıyıcı</CustomButton>
        <CustomButton onPress={() => getServiceHandler(2)}>Şoför</CustomButton>
      </View>
      <AlertDialog message={alertMessage} onClose={() => {
        navigation.navigate(ROUTES.SIGN_IN);
        setAlertMessage('')
      }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50
  },
  mainText: {
    fontSize: 20,
    alignSelf: 'center'
  }
})


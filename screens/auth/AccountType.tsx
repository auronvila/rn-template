import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ScreenProp } from '../publicScreens/WelcomeScreen';
import { ROUTES } from '../../constants';
import CustomButton from '../../components/Button';

type SignUpFormValues = {
  email: string,
  fullName: string,
  password: string,
  phoneNumber: number,
  verifyPassword: string
}

type RootStackParamList = {
  AccountType: SignUpFormValues;
};

export default function AccountType() {
  const data = useRoute<RouteProp<RootStackParamList, 'AccountType'>>();
  const navigation = useNavigation<ScreenProp>();

  useEffect(() => {
    console.log(data.params)
  }, []);

  function getServiceHandler() {
    navigation.navigate(ROUTES.HOME)
  }

  return (
    <SafeAreaView style={{ top: 70 }}>
      <Text style={styles.mainText}>Lütfen Bir Hesap Türü Seçin</Text>
      <View style={styles.buttonWrapper}>
        <CustomButton onPress={getServiceHandler}>Hizmet Alan</CustomButton>
        <CustomButton styles={{marginHorizontal:15}} onPress={() => ''}>Hizmet Verem</CustomButton>
        <CustomButton onPress={() => ''}>Şöför</CustomButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    marginVertical:50
  },
  mainText:{
    fontSize:20,
    alignSelf:'center'
  }
})

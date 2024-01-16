import {Button, Text, View, StyleSheet, Alert, Platform, ScrollView} from 'react-native';
import Input from '../../components/Input';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {ScreenProp} from '../publicScreens/WelcomeScreen';
import {ROUTES} from '../../constants';
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {getAuth, signInWithCredential} from 'firebase/auth'
import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import firebase from 'firebase/compat';
import * as AppleAuthentication from 'expo-apple-authentication';
import {initializeApp} from 'firebase/app';
import CustomButton from '../../components/Button';
import axios from 'axios';
import {AntDesign} from '@expo/vector-icons';
import {AuthContext} from '../../store/auth';


const validationSchema = yup.object().shape({
  emailOrPhone: yup.string()
    .required('Lütfen mail veya telefon numarası giriniz')
    .test('email-or-phone', 'Lütfen geçerli bir telefon numarası giriniz', (value) => {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      const phoneRegex = /^\d{10}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: yup.string().required('Lütfen parola giriniz').min(6, 'Parola en az 6 karakterden oluşmalıdır')
});


WebBrowser.maybeCompleteAuthSession()

export default function SignInScreen() {
  const [userInfo, setUserInfo] = useState()
  const {updateAuth} = useContext(AuthContext)
  const navigation = useNavigation<ScreenProp>();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '100702233245-dr5h3cbfl406dp9ob0mq96ad8tkd3jpi.apps.googleusercontent.com',
    iosClientId: '100702233245-dr5h3cbfl406dp9ob0mq96ad8tkd3jpi.apps.googleusercontent.com',
    redirectUri: 'https://auth-project-c55c0.firebaseapp.com/__/auth/handler',
    webClientId: '1015412238693-7equ9v06equmc0mg5ilsr4er1k92klfv.apps.googleusercontent.com',
    clientSecret: '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',
    clientId: '1015412238693-7equ9v06equmc0mg5ilsr4er1k92klfv.apps.googleusercontent.com'
  });

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyANrkl5aDZpq3uzfsrIWmWRhAF05MC3TF8',
      authDomain: 'auth-project-c55c0.firebaseapp.com',
      databaseURL: 'https://auth-project-c55c0-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'auth-project-c55c0',
      storageBucket: 'auth-project-c55c0.appspot.com',
      messagingSenderId: '1015412238693',
      appId: '1:1015412238693:web:691bf3c5a8e1e118a7998c',
      measurementId: 'G-2H2FD57THL'
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    if (response?.type === 'success') {
      const {id_token} = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(i => console.log('IIIIIIII', i))

      firebase.auth().signInWithCredential(credential).then((result) => {
      }).catch((error) => {
        console.log(error)
        return
      });
    }
  }, [response]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sisteme Giriş'
    })
  }, [])


  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async (data) => {
    const input = data.emailOrPhone;
    const isEmail = /\S+@\S+\.\S+/.test(input);
    const isPhoneNumber = /^\d{10}$/.test(input);

    if (isEmail) {
      const dto = {
        email_address: data.emailOrPhone,
        password: data.password
      }

      try {
        const response = await axios('https://transyol.caykara.dev/api/auth/sign-in/email-address', {
          method: 'POST',
          data: dto,
          headers: {
            'Content-type': 'application/json'
          }
        });
        navigation.navigate(ROUTES.HOME)
        updateAuth(response.data.access_token, 'USER')
      } catch (e) {
        console.log('error---->', e.response);
        alert(e.response.data.message)
      }
    } else if (isPhoneNumber) {
      const dto = {
        phone_number: data.emailOrPhone,
        password: data.password
      }

      try {
        const response = await axios(`${process.env.EXPO_PUBLIC_API_URL}/auth/sign-in/phone-number`, {
          method: 'POST',
          data: dto,
          headers: {
            'Content-type': 'application/json'
          }
        });
        updateAuth(response.data.access_token, 'USER')
      } catch (e) {
        console.log('error---->', e.response);
        alert(e.response.data.message)
      }
    } else {
      console.error('Invalid input');
    }
  };


  const handleSignUpNavigation = () => {
    navigation.navigate(ROUTES.SIGN_UP)
  }

  function handleForgotPassword() {
    navigation.navigate(ROUTES.FORGOT_PASSWORD_NUMBER)
  }


  return (
    <ScrollView style={{width: '90%', alignSelf: 'center'}}>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              name={'emailOrPhone'}
              defaultValue={''}
              isInvalid={!!errors.emailOrPhone}
              rules={{required: 'Email is required', pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/}}
              label="Mail veya telefon numarası"
              keyboardType="email-address"
              secure={false}
              control={control}
              errorText={errors.emailOrPhone?.message}
            />
          )}
          name="emailOrPhone"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              errorText={errors.password?.message}
              control={control}
              label="Parola"
              keyboardType="default"
              name={'password'}
              defaultValue={''}
              isInvalid={!!errors.emailOrPhone}
              rules={{}}
              secure={true}
            />
          )}
          name="password"
          rules={{required: true}}
          defaultValue=""
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleSignUpNavigation}>Hesap Oluştur</CustomButton>
        <CustomButton onPress={handleSubmit(onSubmit)}>Giriş Yap</CustomButton>
      </View>
      <View style={styles.socialButtonWrapper}>
        <View style={{backgroundColor: '#ccc', padding: 10, borderRadius: 20}}>
          <AntDesign
            style={{alignSelf: 'center'}}
            onPress={() => promptAsync()}
            name="google"
            size={24}
            color="black"/>
        </View>
        {Platform.OS === 'ios' && (
          <View>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
              cornerRadius={20}
              style={styles.button}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL
                    ]
                  });
                  console.log(credential)
                } catch (e) {
                  if (e.code === 'ERR_REQUEST_CANCELED') {
                    Alert.alert('you cancelled the apple login process')
                  } else {
                    Alert.alert('an err occureed')
                  }
                }
              }}
            />
          </View>
        )}
      </View>
      <Text onPress={handleForgotPassword} style={styles.forgotPassword}>Parolamı Unuttum</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  socialButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    marginTop: 20
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30
  },
  inputWrapper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  button: {
    width: 50,
    height: 44
  },
  forgotPassword: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    color: 'blue',
    marginTop: 20,
    marginBottom: 20
  }
});

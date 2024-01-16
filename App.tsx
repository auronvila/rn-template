import {StatusBar} from 'expo-status-bar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {ROUTES} from './constants';
import WelcomeScreen, {ScreenProp} from './screens/publicScreens/WelcomeScreen';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import HomeScreen from './screens/private/HomeScreen';
import AccountType from './screens/auth/AccountType';
import ForgotPasswordNumber from './screens/auth/ForgotPasswordNumber';
import ForgotPasswordMail from './screens/auth/ForgotPasswordMail';
import CodeVerification from './screens/auth/CodeVerification';
import NewPassword from './screens/auth/NewPassword';
import {useContext, useEffect, useState} from 'react';
import {AuthContext, AuthContextProvider} from './store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import {ActivityIndicator} from 'react-native';
import UserPersonalInfo from "./screens/private/personalInfo/UserPersonalInfo";
import DriverPersonalInfo from "./screens/private/personalInfo/DriverPersonalInfo";
import TransporterPersonalInfo from "./screens/private/personalInfo/TransporterPersonalInfo";

const Stack = createNativeStackNavigator()


function NavigationWrapper() {
  const {userInfo, updateAuth, isAuthenticated} = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && <AuthanticatedRoutes/>}
      {!isAuthenticated && <UnAuthanticatedRoutes/>}
    </>
  )
}

function UnAuthanticatedRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={WelcomeScreen} name={ROUTES.WELCOME}/>
      <Stack.Screen component={ForgotPasswordNumber} name={ROUTES.FORGOT_PASSWORD_NUMBER}/>
      <Stack.Screen component={ForgotPasswordMail} name={ROUTES.FORGOT_PASSWORD_EMAIL}/>
      <Stack.Screen component={NewPassword} name={ROUTES.NEW_PASSWORD}/>
      <Stack.Screen component={CodeVerification} name={ROUTES.CODE_VERIFICATION}/>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        component={AccountType}
        name={ROUTES.ACCOUNT_TYPE}/>
      <Stack.Screen
        component={SignUpScreen} name={ROUTES.SIGN_UP}/>
      <Stack.Screen
        options={{
          headerLeft: props => <></>
        }}
        component={SignInScreen}
        name={ROUTES.SIGN_IN}/>
      <Stack.Screen
        component={UserPersonalInfo}
        name={ROUTES.USER_PERSONAL_INFO}/>
      <Stack.Screen
        component={DriverPersonalInfo}
        name={ROUTES.DRIVER_PERSONAL_INFO}/>
      <Stack.Screen
        component={TransporterPersonalInfo}
        name={ROUTES.TRANSPORTER_PERSONAL_INFO}/>
    </Stack.Navigator>
  )
}

function AuthanticatedRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={
          {
            headerLeft: () => <></>,
            gestureEnabled: true
          }
        }
        component={HomeScreen}
        name={ROUTES.HOME}/>
    </Stack.Navigator>
  )
}


function Root() {
  const {userInfo, updateAuth, isAuthenticated} = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  const navigation = useNavigation<ScreenProp>();

  useEffect(() => {
    async function getToken() {
      try {
        setIsLoggingIn(true)
        const userInfoString = await AsyncStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString || "{}");
        if (userInfo) {
          updateAuth(userInfo.token, 'USER');
        }
      } catch (e) {
        console.error('Error getting token:', e);
        updateAuth(null, null);
        navigation.navigate(ROUTES.SIGN_IN)
        return
      } finally {
        setIsLoggingIn(false);
      }
    }

    getToken();
  }, []);


  if (isLoggingIn) {
    <ActivityIndicator size={'large'}/>
  }
  return <NavigationWrapper/>
}


export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StatusBar style={'auto'}/>
        <Root/>
      </AuthContextProvider>
    </NavigationContainer>
  );
}


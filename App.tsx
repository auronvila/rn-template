import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from './constants';
import WelcomeScreen from './screens/publicScreens/WelcomeScreen';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import HomeScreen from './screens/private/HomeScreen';
import AccountType from './screens/auth/AccountType';
import ForgotPasswordNumber from './screens/auth/ForgotPasswordNumber';
import ForgotPasswordMail from './screens/auth/ForgotPasswordMail';
import CodeVerification from './screens/auth/CodeVerification';
import NewPassword from './screens/auth/NewPassword';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextProvider } from './store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator()


function NavigationWrapper() {
  const { authToken, updateAuth, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && <AuthanticatedRoutes/>}
      {!isAuthenticated && <UnAuthanticatedRoutes/>}
    </>
  )
}

function UnAuthanticatedRoutes() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.WELCOME}>
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
  const { authToken, updateAuth, isAuthenticated } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  useEffect(() => {
    async function getToken() {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          updateAuth(storedToken);
        }
      } catch (e) {
        console.error('Error getting token:', e);
      } finally {
        setIsLoggingIn(false);
      }
    }
    getToken();
  }, [updateAuth]);


  if (isLoggingIn) {
    <AppLoading/>
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


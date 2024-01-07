import { createContext, ReactNode, useState } from 'react';
import { AuthContextModel } from './model/authContextModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants';
import { ScreenProp } from '../screens/publicScreens/WelcomeScreen';

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string>('')
  const navigation = useNavigation<ScreenProp>();

  async function updateAuth(token: string) {
    await AsyncStorage.setItem('authToken', token)
    setAuthToken(token)
  }

  async function logOut() {
    setAuthToken(null)
    await AsyncStorage.removeItem('authToken')
    navigation.navigate(ROUTES.SIGN_IN)
  }

  return (
    <AuthContext.Provider value={{ updateAuth, logOut,authToken, isAuthenticated: !!authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

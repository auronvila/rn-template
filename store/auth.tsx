import {createContext, ReactNode, useState} from 'react';
import {AuthContextModel} from './model/authContextModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../constants';
import {ScreenProp} from '../screens/publicScreens/WelcomeScreen';

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function AuthContextProvider({children}: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<{ token: string, role: string }>()
  const navigation = useNavigation<ScreenProp>();

  async function updateAuth(token: string, userRole: string) {
    const userInfo = {token, role: userRole};
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    setUserInfo(userInfo)
  }


  async function logOut() {
    setUserInfo(null)
    await AsyncStorage.removeItem('userInfo')
    navigation.navigate(ROUTES.SIGN_IN)
  }


  return (
    <AuthContext.Provider value={{updateAuth, logOut, userInfo, isAuthenticated: !!userInfo}}>
      {children}
    </AuthContext.Provider>
  );
}

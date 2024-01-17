import {createContext, ReactNode, useEffect, useState} from 'react';
import {AuthContextModel} from './model/authContextModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../constants';
import {ScreenProp} from '../screens/publicScreens/WelcomeScreen';

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function AuthContextProvider({children}: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<{ token: string | null, role: string | null } | null>()
  const navigation = useNavigation<ScreenProp>();
  const [isAuthenticated, setIsAuthenticated] = useState(!!userInfo);

  useEffect(() => {
    setIsAuthenticated(!!userInfo);
  }, [userInfo]);

  async function updateAuth(token: string | null, userRole: string | null) {
    const userInfo = {token, role: userRole};
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    setUserInfo(userInfo)
  }


  async function logOut() {
    await AsyncStorage.removeItem('userInfo');
    setUserInfo(null);
  }



  return (
    <AuthContext.Provider value={{updateAuth, logOut, userInfo, isAuthenticated: isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

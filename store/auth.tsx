import { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthContextModel } from './model/authContextModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<{ token: string | null, role: string | null } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuthStatus() {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString || '{}');
      setIsAuthenticated(!!userInfo.token);
      setUserInfo(userInfo);
    }

    checkAuthStatus();
  }, []);

  async function updateAuth(token: string | null, userRole: string | null) {
    const newUserInfo = {token, role: userRole};
    await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    setIsAuthenticated(!!token);
  }


  async function logOut() {
    await AsyncStorage.removeItem('userInfo');
    setUserInfo(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ updateAuth, logOut, userInfo, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}


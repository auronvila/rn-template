import { createContext, ReactNode, useState } from 'react';
import { AuthContextModel } from './model/authContextModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string>('')

  async function updateAuth(token: string) {
    await AsyncStorage.setItem('authToken', token)
    setAuthToken(token)
  }

  async function logOut() {
    setAuthToken(null)
    await AsyncStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ updateAuth, logOut,authToken, isAuthenticated: !!authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

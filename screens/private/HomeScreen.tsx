import { Button, Text } from 'react-native';
import {useContext, useEffect} from 'react';
import { AuthContext } from '../../store/auth';


export default function HomeScreen() {
  const { logOut } = useContext(AuthContext)

  return (
    <>
      <Text>HOME SCREEN</Text>
      <Button onPress={logOut} title={'logOut'}/>
    </>
  )
}
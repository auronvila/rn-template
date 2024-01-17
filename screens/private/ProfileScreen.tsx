import {Button, Text, View} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../../store/auth";

export default function ProfileScreen() {
  const {logOut} = useContext(AuthContext)

  return (
    <View>
      <Text>PROFILE SCREEN</Text>
      <Button onPress={logOut} title={'logOut'}/>
    </View>
  )
}
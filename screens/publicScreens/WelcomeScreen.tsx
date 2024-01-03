import React, { useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from '../../constants';
import CustomButton from '../../components/Button';

export type ScreenProp = NativeStackNavigationProp<any, string>;

export default function WelcomeScreen() {
  const navigation = useNavigation<ScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [])

  return (
    <>
      <Text style={styles.mainText}>Hoşgeldiniz</Text>
      <Text style={styles.content}>The screen will be updated....</Text>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => navigation.navigate(ROUTES.SIGN_IN)}>Devam Et</CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  mainText: {
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20
  },
  content:{
    marginVertical:140,
    alignSelf:'center'
  }
})

import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth';
import { AntDesign } from '@expo/vector-icons';
import { UserService } from '../../services/user.service';
import ProfileSectionWrapper from '../../components/ProfileSectionWrapper';

export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext)
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number>(0)

  useEffect(() => {
    try {
      UserService.getUserDetails().then(i => {
        setEmailAddress(i.email_address);
        setRole(i.roles[0])
        setPhoneNumber(i.phone_number);
        setFullName(i.fullname);
      })
    } catch (e) {
      console.log(e)
      return
    }
  }, []);

  return (
    <View>
      <Text style={styles.nameText}>{fullName}</Text>
      <Text style={styles.emailText}>{emailAddress}</Text>
      <Text style={[styles.emailText, { marginVertical: 6 }]}>0{phoneNumber}</Text>
      <Text style={[styles.emailText, { marginBottom: 15 }]}>{role}</Text>
      <ProfileSectionWrapper text={'Belgeler'}/>
      <ProfileSectionWrapper text={'Parolanı Güncelle'}/>
      <ProfileSectionWrapper text={'Çıkış'} styles={{ backgroundColor: '#f7867e' }} onPress={logOut}/>
    </View>
  )
}

const styles = StyleSheet.create({
  nameText: {
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 40,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  emailText: {
    alignSelf: 'center',
    fontSize: 17
  }
})
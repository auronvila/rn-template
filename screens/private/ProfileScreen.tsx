import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../store/auth';
import { UserService } from '../../services/user.service';
import ProfileSectionWrapper from '../../components/ProfileSectionWrapper';
import { ROUTES, USER_ROLES } from '../../constants';
import { LocalizeUserRole } from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { ScreenProp } from '../publicScreens/WelcomeScreen';

export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [isChangingRole, setIsChangingRole] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<ScreenProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('girdi')
        const userData = await UserService.getUserDetails();
        setEmailAddress(userData.email_address);
        setRole(userData.roles[0]);
        setPhoneNumber(userData.phone_number);
        setFullName(userData.fullname);
        console.log('cikti')

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleRoleChange = async (newRole: string) => {
    try {
      setIsLoading(true);
      await UserService.changeOrUpdateRole(newRole);
      setRole(newRole);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsChangingRole(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.nameText}>{fullName}</Text>
      <Text style={styles.emailText}>{emailAddress}</Text>
      <Text style={[styles.emailText, { marginVertical: 6 }]}>0{phoneNumber}</Text>
      <View style={styles.roleContainer}>
        <Text style={[styles.emailText, { marginBottom: 15 }]}>{LocalizeUserRole(role)}</Text>
        {!isChangingRole ? (
          <Button title="Rolü Güncelle" onPress={() => setIsChangingRole(true)}/>
        ) : (
          <View style={styles.roleChangeButtons}>
            <Button title="Kulanıcı" onPress={() => handleRoleChange(USER_ROLES.USER)}/>
            <Button title="Şoför" onPress={() => handleRoleChange(USER_ROLES.DRIVER)}/>
            <Button title="Hizmet Veren" onPress={() => handleRoleChange(USER_ROLES.TRANSPORTER)}/>
            <Button title="Vazgeç" onPress={() => setIsChangingRole(false)}/>
          </View>
        )}
      </View>
      <ProfileSectionWrapper text={'Belgeler'}/>
      <ProfileSectionWrapper onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD)} text={'Parolanı Güncelle'}/>
      <ProfileSectionWrapper text={'Çıkış'} styles={{ backgroundColor: '#f7867e' }} onPress={logOut}/>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  },
  roleContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  roleChangeButtons: {
    flexDirection: 'column',
    gap: 5,
    marginTop: 10
  }
});

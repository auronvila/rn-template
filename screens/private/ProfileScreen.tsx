import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth';
import { AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext)

  return (
    <View style={{}}>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.emailText}>johndoe@gmail.com</Text>
      <Text style={[styles.emailText, { marginVertical: 6 }]}>5072345456</Text>
      <Text style={styles.emailText}>Şoför</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <View>
          <Text>Belgeler</Text>
        </View>
        <View>
          <AntDesign name={'right'} size={20}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut} style={[styles.buttonContainer, { backgroundColor: '#f7867e' }]}>
        <View>
          <Text>Çıkış</Text>
        </View>
        <View>
          <AntDesign name={'right'} size={20}/>
        </View>
      </TouchableOpacity>
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
  },
  buttonContainer: {
    marginTop: 40,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%'
  }
})
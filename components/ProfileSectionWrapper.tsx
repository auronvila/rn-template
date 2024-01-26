import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type ProfileSectionWrapperProp = {
  styles?: ViewStyle,
  text: string,
  onPress?: () => void,
}

export default function ProfileSectionWrapper(props: ProfileSectionWrapperProp) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.buttonContainer, props.styles]}>
      <View>
        <Text>{props.text}</Text>
      </View>
      <View>
        <AntDesign name={'right'} size={20}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
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
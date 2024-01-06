import { Pressable, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';

type ButtonProps = {
  children: string,
  onPress: () => void,
  styles?: StyleProp<ViewStyle>
}

export default function CustomButton(props: ButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, props.styles && props.styles, pressed && styles.pressed]}
               onPress={props.onPress}>
      <Text style={styles.textStyle}> {props.children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    minWidth: 110,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: .4
  }
})
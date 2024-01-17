import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import {COLORS} from '../constants/Colors';
import {Controller, RegisterOptions} from 'react-hook-form';

type InputProps = {
  label: string,
  keyboardType: KeyboardTypeOptions,
  secure: boolean,
  control: any,
  isInvalid: boolean,
  name: string,
  rules?: RegisterOptions,
  defaultValue: string,
  placeHolder?: string,
  errorText?: string
}

function Input({
                 label,
                 keyboardType,
                 secure,
                 control,
                 isInvalid,
                 placeHolder,
                 name,
                 rules,
                 errorText,
                 defaultValue
               }: InputProps) {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.inputContainer}>
          <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
            {label}
          </Text>
          <TextInput
            placeholder={placeHolder}
            style={[styles.input, isInvalid && styles.inputInvalid]}
            autoCapitalize={'none'}
            keyboardType={keyboardType}
            secureTextEntry={secure}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
}


export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8
  },
  errorText: {
    color: COLORS.error500
  },
  label: {
    color: 'black',
    marginBottom: 4
  },
  labelInvalid: {
    color: COLORS.error500
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16
  },
  inputInvalid: {
    backgroundColor: COLORS.error100
  }
});

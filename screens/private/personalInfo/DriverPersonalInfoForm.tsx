import {StyleSheet, Switch, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import Input from "../../../components/Input";
import CustomButton from "../../../components/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ReactElement} from "react";
import {useNavigation} from "@react-navigation/native";
import {ScreenProp} from "../../publicScreens/WelcomeScreen";
import {ROUTES} from "../../../constants";

export default function DriverPersonalInfoForm() {
  const navigation = useNavigation<ScreenProp>();

  const validationSchema = yup.object().shape({
    identityNumber: yup.number()
      .required('Lütfen Tc. kimlik numaranızı giriniz')
  });


  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async (data) => {
    // todo send req to the backend
    console.log(data)
    // navigation.navigate(ROUTES.HOME)
  };

  return (
    <View>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeHolder={'Tc kimlik No.'}
              name={'identityNumber'}
              defaultValue={''}
              isInvalid={!!errors.identityNumber}
              label="Tc kimlik No."
              keyboardType="numeric"
              secure={false}
              control={control}
              errorText={errors.identityNumber?.message}
            />
          )}
          name="identityNumber"
        />
      </View>
      <View style={{
        alignSelf: 'flex-end',
        marginTop: 15
      }}>
        <CustomButton onPress={handleSubmit(onSubmit)}>Tamamla</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  optionWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
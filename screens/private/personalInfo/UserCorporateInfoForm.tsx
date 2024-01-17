import {StyleSheet, Switch, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import Input from "../../../components/Input";
import CustomButton from "../../../components/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ReactElement} from "react";

export default function UserCorporateInfoForm(props: { switchComponent: ReactElement }) {
  const validationSchema = yup.object().shape({
    taxIdentityNumber: yup.number()
      .required('Lütfen Vergi kimli numarasını giriniz'),
    title: yup.string()
      .required('Lütfen Ünvanınızı giriniz')
  });


  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async (data:any) => {
    console.log(data)
  };

  return (
    <View>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeHolder={'Ünvan'}
              name={'title'}
              defaultValue={''}
              isInvalid={!!errors.title}
              label="Ünvan"
              keyboardType="default"
              secure={false}
              control={control}
              errorText={errors.title?.message}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeHolder={'Vergi kimlik No.'}
              name={'taxIdentityNumber'}
              defaultValue={''}
              isInvalid={!!errors.taxIdentityNumber}
              label="Vergi kimlik No."
              keyboardType="numeric"
              secure={false}
              control={control}
              errorText={errors.taxIdentityNumber?.message}
            />
          )}
          name="taxIdentityNumber"
        />

      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
      }}>
        {props.switchComponent}

        <CustomButton onPress={handleSubmit(onSubmit)}>İlerle</CustomButton>
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
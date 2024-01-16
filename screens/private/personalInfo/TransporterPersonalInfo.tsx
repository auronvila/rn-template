import {StyleSheet, Switch, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState} from "react";
import TransporterCorporateInfoForm from "./TransporterCorporateInfoForm";
import TransporterPersonalForm from "./TransporterPersonalForm";

export default function TransporterPersonalInfo() {
  const [isCorporate, setIsCorporate] = useState(false);
  const toggleSwitch = () => setIsCorporate(previousState => !previousState);

  const validationSchema = yup.object().shape({
    taxIdentityNumber: yup.string()
      .required('reqq'),
    title: yup.string()
      .required('reqq'),
  });


  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
  });


  return (
    <View style={styles.inputWrapper}>
      {isCorporate ? (
        <TransporterCorporateInfoForm switchComponent={<View style={styles.optionWrapper}>
          <Switch
            trackColor={{false: '#767577', true: 'black'}}
            thumbColor={isCorporate ? 'orange' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isCorporate}
          />
          <Text style={{marginLeft: 15}}>Kurumsal</Text>
        </View>}/>
      ) : (
        <TransporterPersonalForm switchComponent={<View style={styles.optionWrapper}>
          <Switch
            trackColor={{false: '#767577', true: 'black'}}
            thumbColor={isCorporate ? 'orange' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isCorporate}
          />
          <Text style={{marginLeft: 15}}>Kurumsal</Text>
        </View>}/>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    margin: 30,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

import {StyleSheet, Switch, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import Input from "../../../components/Input";
import CustomButton from "../../../components/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useContext, useState } from 'react';
import UserPersonalInfoForm from "./UserPersonalInfoForm";
import UserCorporateInfoForm from "./UserCorporateInfoForm";
import { AuthContext } from '../../../store/auth';

export default function UserPersonalInfo() {
  const [isCorporate, setIsCorporate] = useState(false);
  const {isAuthenticated} = useContext(AuthContext)
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
        <UserCorporateInfoForm switchComponent={<View style={styles.optionWrapper}>
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
        <UserPersonalInfoForm switchComponent={<View style={styles.optionWrapper}>
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

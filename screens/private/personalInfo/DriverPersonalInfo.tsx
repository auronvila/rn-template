import {StyleSheet, Switch, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import Input from "../../../components/Input";
import CustomButton from "../../../components/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {useState} from "react";
import UserPersonalInfoForm from "./UserPersonalInfoForm";
import UserCorporateInfoForm from "./UserCorporateInfoForm";
import DriverPersonalInfoForm from "./DriverPersonalInfoForm";

export default function DriverPersonalInfo() {

  const validationSchema = yup.object().shape({
    taxIdentityNumber: yup.string()
      .required('reqq'),
    title: yup.string()
      .required('reqq'),
  });


  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema,)
  });


  return (
    <View style={styles.inputWrapper}>
      <DriverPersonalInfoForm/>
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

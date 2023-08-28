import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Text, TextInput, Alert } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Entypo } from '@expo/vector-icons';
import { ComponentButtonInterface, ComponentLoading } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation"
import { Ionicons } from '@expo/vector-icons';
import { IRegister } from "../../services/data/User"
import { AxiosError } from "axios";
import { apiUser } from "../../services/data";

export interface IErrorApi {
  errors: {
    rule: string
    field: string
    message: string
  }[]
}
export function Cadastrar({ navigation }: LoginTypes) {
  const [data, setData] = useState<IRegister>()
  const [isLoading, setIsLoading] = useState(true)
  function handleChange(item: IRegister) {
    setData({ ...data, ...item })
  }
   async function handleRegister() {
    try {
      setIsLoading(true)
      if(data?.name && data.email && data.password) {
        const response =  await apiUser.register( data)
        Alert.alert(`${response.data.name} cadastrado!!`)
      } else {
        Alert.alert("Preencha todos os campos!")
      }
    } catch (error) {
      const err = error as AxiosError
      const errorData = err.response?.data as IErrorApi
      let message = ""
      if (errorData){
        for (const iterator of errorData.errors) {
          message = `${message} ${iterator.message} \n`
        }
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])
  return (
    <>
    {isLoading ? (
      <ComponentLoading />
    ) : (
      <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>CADASTRO</Text>
        <View style={styles.formRow}>
          <Ionicons name="person" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nome"
            placeholderTextColor={colors.black}
            style={styles.input}
            onChangeText={(i) => handleChange({ name: i })}
          />
        </View>
        <View style={styles.formRow}>

          <MaterialIcons name="email" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={colors.black}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(i) => handleChange({ email: i })}
          />
        </View>
        <View style={styles.formRow}>
          <Entypo name="key" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor={colors.black}
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(i) => handleChange({ password: i })}
          />
        </View>
        <ComponentButtonInterface title="Salvar" type="primary" onPressI={() => { handleRegister }} />
        <ComponentButtonInterface title="Voltar" type="secondary" onPressI={() => { navigation.navigate('Login') }} />
      </KeyboardAvoidingView>
    </View>
    )}
    </>
  );
}

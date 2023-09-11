import React, {useState} from "react";
import { View, TouchableOpacity, Text, KeyboardAvoidingView, Alert, TextInput } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Entypo } from '@expo/vector-icons';
import { ComponentButtonInterface } from "../../components";
import {LoginTypes} from "../../navigations/login.navigation"
import { useAuth } from "../../hooks/auth";
import { IAuthenticate } from "../../services/data/User";
import { AxiosError } from "axios";

export function Login({ navigation }: LoginTypes) {
  const { signIn } = useAuth();
    const [data,setData] = useState<IAuthenticate>();
    const [isLoading, setIsLoading] = useState(true);
    async function handleSignIn(){
        try{
            setIsLoading(true);
            if(data?.email && data.password){
                await signIn(data);
            } else {
                Alert.alert("Preencha todos os campos");
                setIsLoading(false);
            }
        }catch(error){
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false)
        }
    }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>LOGIN</Text>
        <View style={styles.formRow}>
          <MaterialIcons name="email" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={colors.black}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.formRow}>
        <Entypo name="key" style={styles.icon} />          
        <TextInput
            placeholder="Senha"
            placeholderTextColor={colors.black}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <ComponentButtonInterface title="Login" type="primary" onPressI={() => {navigation.navigate('Tab')}} />
        <ComponentButtonInterface title="Cadastrar" type="secondary" onPressI={() => {navigation.navigate('Cadastrar')}} />
      </KeyboardAvoidingView>
    </View>
  );
}

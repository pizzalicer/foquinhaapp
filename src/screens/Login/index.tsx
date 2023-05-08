import React from "react";
import { View, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Entypo } from '@expo/vector-icons';
import { ComponentButtonInterface } from "../../components";
import {LoginTypes} from "../../navigations/login.navigation"

export function Login({ navigation }: LoginTypes) {
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

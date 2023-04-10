import React from "react";
import { View, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Entypo } from '@expo/vector-icons';
import { ComponentButtonInterface } from "../../components";
import { LoginTypes} from "../../navigations/login.navigation"
import { Ionicons } from '@expo/vector-icons';

export function Cadastrar({navigation}: LoginTypes) {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>CADASTRO</Text>
        <View style={styles.formRow}>
        <Ionicons name="person" size={24} color="black" style={styles.icon}/>
          <TextInput
              placeholder="Nome"
              placeholderTextColor={colors.black}
              style={styles.input}
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
        <ComponentButtonInterface title="Salvar" type="primary" onPressI={() => {console.log('Salvar')}} />
        <ComponentButtonInterface title="Voltar" type="secondary" onPressI={() => {navigation.navigate('Login')}} />
      </KeyboardAvoidingView>
    </View>
  );
}

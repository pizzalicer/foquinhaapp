import React from "react"
import { View, KeyboardAvoidingView, Text, TextInput } from "react-native"
import { styles } from "./styles"
import { MaterialIcons } from '@expo/vector-icons'; 
import {colors } from "../../styles/colors"

export function Login() {
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView>
              <Text style={styles.title}>LOGIN</Text>
            <View>
                <MaterialIcons name= "email"/>
                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor={colors.black}
                    keyboardType= "email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

            </View>
            </KeyboardAvoidingView>
        </View>
    )
}
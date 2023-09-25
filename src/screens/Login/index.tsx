import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Text, TextInput, Alert  } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import { ComponentButtonInterface } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation"
import { IAuthenticate } from "../../services/data/User";
import { useAuth } from "../../hooks/auth";
import { AxiosError } from "axios";

export function Login({navigation}: LoginTypes){
    const { signIn } = useAuth();
    const [data, setData] = useState<IAuthenticate>();
    const [isLoading, setIsLoading] = useState(true);
    async function handleSing() {
        try {
            setIsLoading(true);
            if (data?.email && data.password) {
                await signIn(data);
            } else {
                Alert.alert("Preencha todos os campos!!");
                setIsLoading(false);
            }
        } catch (error) {
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false);
        }
    }

    function handleChange(item: IAuthenticate){
        setData({...data, ...item})
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },2000)
    },[])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}> Login </Text>
                <View style={styles.formRow}>
                <MaterialCommunityIcons name="email-outline" style= {styles.icon} />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor={colors.black}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={(i) => handleChange({email: i})}
                        />
                </View>
                <View style={styles.formRow}>
                <MaterialIcons name="lock-outline" style= {styles.icon} />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor={colors.black}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={(i) => handleChange({password: i})}
                        />
                </View>
                <ComponentButtonInterface title="Entrar" type='primary' onPressI={handleSing} />
                <ComponentButtonInterface title="Cadastrar-se" type='secondary' onPressI={() => { navigation.navigate('Cadastrar') }} />
            </KeyboardAvoidingView>
        </View>
    )
}
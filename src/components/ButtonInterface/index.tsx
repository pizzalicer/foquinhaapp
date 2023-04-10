import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text} from "react-native";
import { styles } from './styles';
export interface IBSlider extends TouchableOpacityProps {
    onPressI: () => void
    title: string
    type: 'primary' | 'secondary' | 'third' | 'fourth'
}
export function ButtonInterface({ onPressI, title, type, ...rest }: IBSlider) {
    return (
        <TouchableOpacity style={
            type == "primary" ? styles.buttonPrimary :
                type == "secondary" ? styles.buttonSecondary :
                    styles.buttonThird
        } onPress={onPressI} 
        {...rest}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
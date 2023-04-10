import { StyleSheet } from 'react-native';
import { colors  } from '../../styles/colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center",
        color:colors.black
    },
    formRow: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    icon: {
        fontSize: 28,
        color: colors.primary,
        padding: 5
    },
    input: {
        fontSize: 18,
        padding: 10,
        width: "70%"

    }
}
)
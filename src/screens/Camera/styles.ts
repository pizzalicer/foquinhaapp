import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      justifyContent: "flex-end", 
      alignItems: "center",
      marginTop: 40,
      marginBottom: 40
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    img:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },
    botao:{
      flexDirection: "row",
      marginBottom: "10%",
      justifyContent: "space-around"
    },
  });
  
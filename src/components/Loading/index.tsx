import LottieView from "lottie-react-native"
import loading from "../../lotties/foquinha.json"

export function Loading (){
    return <LottieView source={loading} autoPlay loop />

}
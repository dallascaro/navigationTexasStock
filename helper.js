import { API_URL } from "./Config";
import { Alert } from "react-native-web";


export async function fetchPublishableKey() {
    try{
        const response = await fetch('${API_URL}/config')
        const {publishableKey} = await response.json()
        return publishableKey
    }catch(e) {
        console.log(e)
        console.warn('Unable to fetch publishable key, Server running?')
        Alert.alert("Error", 'Unable to fetch publishable key')
    }
}
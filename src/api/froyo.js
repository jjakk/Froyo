import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINT } from "@froyo/constants";

const instance =  axios.create({
    baseURL: API_ENDPOINT
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token")
        if(token){
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;
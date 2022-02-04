import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = __DEV__ ? 'http://127.0.0.1:8000' : 'https://api.froyo.social';

const instance =  axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
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
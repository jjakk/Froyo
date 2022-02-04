import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '../constants/constants';

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
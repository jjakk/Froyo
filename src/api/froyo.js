import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance =  axios.create({
    baseURL: 'https://froyo-api.herokuapp.com'
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
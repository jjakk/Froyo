// Another API option that uses fetch intead of axios
import FormData from 'form-data';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '../constants/constants';

const formRequest = async (method, route, data={}) => {
    if(route[0] !== '/') route = `/${route}`;
    method = method.toLowerCase();
    let formData = new FormData();
    const token = await AsyncStorage.getItem('token')

    // Append data to the formData if the method is POST
    if (method !== 'get') {
        const dataKeys = Object.keys(data);
        for(let i = 0; i < dataKeys.length; i++){
            const key = dataKeys[i];
            const value = data[key];
            if (typeof(value) === 'object') {
                for(let j = 0; j < value.length; j++){
                    let currentValue = value[j];
                    // Format for image uploads
                    if(key === 'images'){
                        let uriParts = currentValue.split('.');
                        let fileType = uriParts[uriParts.length - 1];
                        currentValue = {
                            uri: value[j],
                            name: `image.${fileType}`,
                            type: `image/${fileType}`,
                        };
                    }
                    formData.append(key, currentValue);
                }
            }
            else {
                formData.append(key, value);
            }
        }
    }

    const response = await fetch(`${BASE_URL}${route}`, {
        method: method,
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${token}`
        },
        body: method !== 'get' ? formData : null,
    })
    
    const responseData = await response.text();
    const statusCategory = parseInt(parseInt(response.status) / 100);

    switch (statusCategory) {
        case 2:
            return responseData;
        case 4:
            throw { message: 'Bad Request' };
        case 5:
            throw { message: 'Server Error' };
        default:
            throw { message: 'Something went wrong' };
    }
};

export default formRequest;

import axios from 'axios';

export default axios.create({
    baseURL: 'https://froyo-api.herokuapp.com'
});
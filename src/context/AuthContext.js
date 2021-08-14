import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'sign_in':
            return { ...state, token: action.payload, errorMessage: '' };
        case 'sign_out':
            return { ...state, token: null, errorMessage: '' };
        case 'get_user_info':
            return { ...state, user: action.payload, errorMessage: '' }
        default:
            return state;
    }
};

const signIn = (dispatch) => async ({ email, password }) => {
    try{
        const response = await froyoApi.post('/auth/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'sign_in', payload: response.data.token });
        navigate('mainFlow');
    }
    catch(err){
        let message;
        if(err.response){
            message = err.response.data;
        }
        else{
            message = err.message;
        }
        dispatch({ type: 'add_error', payload: message });
    }
};

const continueSignUp = (dispatch) => async ({ email, username, dob }) => {
    console.log(calculateAge(dob));
    try{
        if(!email){
            dispatch({ type: 'add_error', payload: 'Email is required' });
            return;
        }
        if(!username){
            dispatch({ type: 'add_error', payload: 'Username is required' });
            return;
        }
        if(calculateAge(dob) < 13){
            dispatch({ type: 'add_error', payload: 'You must be 13 years or older to sign up' });
            return;
        }
        const response = await froyoApi.post('/auth/verifyInfo', { email, username, dob });
        console.log(response);
        navigate('SignUpTwo', { email, username, dob });
    }
    catch(err){
        let message;
        if(err.response){
            message = err.response.data;
        }
        else{
            message = err.message;
        }
        dispatch({ type: 'add_error', payload: message });
    }
};

const signUp = (dispatch) => async (info) => {
    try{
        const { email, username, dob, firstName, lastName, password, passwordConfirm } = info;
        if(password !== passwordConfirm){
            dispatch({ type: 'add_error', payload: 'Passwords must match' });
            return;
        }
        const response = await froyoApi.post('/auth/signup', info);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'sign_in', payload: response.data.token });
        navigate('homeFlow');
    }
    catch(err){
        let message;
        if(err.response){
            message = err.response.data;
        }
        else{
            message = err.message;
        }
        dispatch({ type: 'add_error', payload: message });
    }
};

const signOut = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'sign_out' });
    navigate('Welcome');
};

const getUserInfo = (dispatch) => async () => {
    try{
        const token = await AsyncStorage.getItem('token');
        const response = await froyoApi.get('/', {
            headers: {
                authorization: token
            }
        });
        const { username, email } = response.data;
        dispatch({ type: 'get_user_info', payload: { username, email } });
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
}

const checkSignedIn = (dispatch) => async () => {
    try{
        const token = await AsyncStorage.getItem('token');
        const { email, username } = await froyoApi.get('/', {
            headers: {
                authorization: token
            }
        });
        navigate('mainFlow');
    }
    catch(err){
        console.log("Couldn't autheticate");
        navigate('Welcome');
    }
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'add_error', payload: '' });
}

// Helper functions

const calculateAge = (birthDate) => {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, continueSignUp, signUp, checkSignedIn, signOut, getUserInfo, clearErrorMessage },
    { /*isSignedIn: false,*/ user: {}, errorMessage: '' }
);


import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';
import { navigate } from '../navigation/navigationRef';

// Handle setting state
const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'sign_in':
            return { ...state, token: action.payload, errorMessage: '' };
        case 'sign_out':
            return { ...state, token: null, errorMessage: '' };
        case 'get_user_info':
            return { ...state, contentLoaded: true, user: action.payload, errorMessage: '' }
        default:
            return state;
    }
};

// Sign in with email and password
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

// Verify that the information from the first page of sign up is valid
const continueSignUp = (dispatch) => async ({ email, username, dob }) => {
    try{
        // Check all feilds are filled
        switch(''){
            case email:
                dispatch({ type: 'add_error', payload: 'Email is required' });
                return;
            case username:
                dispatch({ type: 'add_error', payload: 'Username is required' });
                return;
            case dob:
                dispatch({ type: 'add_error', payload: 'Date of Birth is required' });
                return;
        }
        // Check user is old enough
        if(calculateAge(dob) < 13){
            dispatch({ type: 'add_error', payload: 'You must be 13 years or older to sign up' });
            return;
        }
        // Check server if email, and username are valid
        const checkEmail = await froyoApi.post('/auth/checkEmail', { email });
        const checkUsername = await froyoApi.post('/auth/checkUsername', { username });
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

// Create an account & sign in
const signUp = (dispatch) => async (info) => {
    try{
        const { email, username, dob, firstName, lastName, password, passwordConfirm } = info;
        // Check all feilds are filled
        switch(''){
            case firstName:
                dispatch({ type: 'add_error', payload: 'Must enter a first name' });
                return;
            case lastName:
                dispatch({ type: 'add_error', payload: 'Must enter a last name' });
                return;
            case password:
                dispatch({ type: 'add_error', payload: 'Must enter a password' });
                return;
            case passwordConfirm:
                dispatch({ type: 'add_error', payload: 'Must confirm password' });
                return;
        }
        // Make sure passwords match
        if(password !== passwordConfirm){
            dispatch({ type: 'add_error', payload: 'Passwords must match' });
            return;
        }
        const response = await froyoApi.post('/auth/signup', { email, username, dob, firstName, lastName, password });
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

// Clear token from AsyncStorage
const signOut = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'sign_out' });
    navigate('Welcome');
};

// Get a user's information given their auth token
const getUserInfo = (dispatch) => async () => {
    try{
        const user = await froyoApi.get('/');
        const id = user.data;
        const response = await froyoApi.get(`/users/${id}`);
        dispatch({ type: 'get_user_info', payload: response.data });
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Update a user's information
const updateUserInfo = (dispatch) => async (info) => {
    try{
        const { firstName, lastName, username, description} = info;
        const user = await froyoApi.get('/');
        const id = user.data;
        console.log(id);
        const response = await froyoApi.put(`/users/${id}`, { firstName, lastName, username, description });
        console.log(response);
        navigate('AccountView');
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

// Goes to either your feed or welcome page depending on whether you are logged in
const checkSignedIn = (dispatch) => async () => {
    try{
        const user = await froyoApi.get('/');
        navigate('mainFlow');
    }
    catch(err){
        console.log("Couldn't autheticate");
        navigate('Welcome');
    }
};

// Clear the error message
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'add_error', payload: '' });
};

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
    { signIn, continueSignUp, signUp, checkSignedIn, signOut, getUserInfo, updateUserInfo, clearErrorMessage },
    { /*isSignedIn: false,*/
        user: {},
        contentLoading: false,
        errorMessage: ''
    }
);


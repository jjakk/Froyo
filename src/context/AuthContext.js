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
            return { ...state, user: action.payload, errorMessage: '' }
        default:
            return state;
    }
};

// For all functions: If callback parameter is true, task succeeded; if false, task failed

// Sign in with email and password
const signIn = (dispatch) => async ({ email, password }, callback) => {
    try{
        const { headers: { authorization } } = await froyoApi.post('/auth/login', { email, password });
        const token = authorization.replace('Bearer ', '');
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'sign_in', payload: token });
        callback(true);
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(false);
    }
};

// Verify that the information from the first page of sign up is valid
const continueSignUp = (dispatch) => async ({ email, username, dob }, callback) => {
    try{
        // Check all feilds are filled
        switch(''){
            case email:
                dispatch({ type: 'add_error', payload: 'Email is required' });
                callback(false);
                return;
            case username:
                dispatch({ type: 'add_error', payload: 'Username is required' });
                callback(false);
                return;
            case dob:
                dispatch({ type: 'add_error', payload: 'Date of Birth is required' });
                callback(false);
                return;
        }

        // Check user is old enough
        if(calculateAge(dob) < 13){
            dispatch({ type: 'add_error', payload: 'You must be 13 years or older to sign up' });
            callback(false);
            return;
        }

        // Check server if email, and username are valid
        const checkEmail = await froyoApi.get(`/auth/emailTaken/${email}`);
        const checkUsername = await froyoApi.get(`/auth/usernameTaken/${username}`);
        callback(checkEmail && checkUsername);
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(false);
    }
};

// Create an account & sign in
const signUp = (dispatch) => async (info, callback) => {
    try{
        const { email, username, dob, first_name, last_name, password, passwordConfirm } = info;
        // Check all feilds are filled
        switch(''){
            case first_name:
                dispatch({ type: 'add_error', payload: 'Must enter a first name' });
                callback(false);
                return;
            case last_name:
                dispatch({ type: 'add_error', payload: 'Must enter a last name' });
                callback(false);
                return;
            case password:
                dispatch({ type: 'add_error', payload: 'Must enter a password' });
                callback(false);
                return;
            case passwordConfirm:
                dispatch({ type: 'add_error', payload: 'Must confirm password' });
                callback(false);
                return;
        }
        // Make sure passwords match
        if(password !== passwordConfirm){
            dispatch({ type: 'add_error', payload: 'Passwords must match' });
            callback(false);
            return;
        }
        const { headers: { authorization } } = await froyoApi.post('/users/', { email, username, dob, first_name, last_name, password });
        const token = authorization.replace('Bearer ', '');
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'sign_in', payload: token});
        callback(true);
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(false);
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
        const { data: { id } } = await froyoApi.get('/');
        const response = await froyoApi.get(`/users/${id}`);
        dispatch({ type: 'get_user_info', payload: response.data });
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Update a user's information
const updateUserInfo = (dispatch) => async (info, callback) => {
    try{
        const { firstName, lastName, username, description} = info;
        // Check all required fields are filled
        switch(''){
            case firstName:
                dispatch({ type: 'add_error', payload: 'Must enter a first name' });
                callback(false);
                return;
            case lastName:
                dispatch({ type: 'add_error', payload: 'Must enter a last name' });
                callback(false);
                return;
            case username:
                dispatch({ type: 'add_error', payload: 'Must enter a username' });
                callback(false);
                return;
        }
        const user = await froyoApi.get('/');
        const id = user.data;
        const response = await froyoApi.put(`/users/${id}`, { firstName, lastName, username, description });
        callback(true);
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(false);
    }
};

// Goes to either your feed or welcome page depending on whether you are logged in
const checkSignedIn = (dispatch) => async () => {
    try{
        const { data: userId } = await froyoApi.get('/');
        const { data: user } = await froyoApi.get(`/users/${userId}`);
        dispatch({ type: 'get_user_info', payload: user });
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
    {
        signIn,
        continueSignUp,
        signUp,
        checkSignedIn,
        signOut,
        getUserInfo,
        updateUserInfo,
        clearErrorMessage
    },
    {
        user: {},
        errorMessage: ''
    }
);


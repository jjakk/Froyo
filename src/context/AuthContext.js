import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';
import froyoApi from '../api/froyo';
import { navigate } from '../navigation/navigationRef';
import { ageInYears } from '../helperFunctions/age';

// Handle setting state
const authReducer = (state, action) => {
    switch(action.type){
        case 'sign_in':
            return { ...state, token: action.payload };
        case 'sign_out':
            return { ...state, token: null };
        case 'get_user_info':
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

// For all functions: If callback parameter is true, task succeeded; if false, task failed

// Sign in with email and password
const signIn = (dispatch) => async ({ email, password }, callback) => {
    try{
        // Check that all fields are complete first
        switch(''){
            case email:
                return callback('Must provide an email');
            case password:
                return callback('Must provide a password');
        }
        // Get authentication token from API
        const { headers: { authorization } } = await froyoApi.post('/auth/login', { email, password });
        const token = authorization.replace('Bearer ', '');
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'sign_in', payload: token });
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
};

// Verify that the information from the first page of sign up is valid
const continueSignUp = () => async ({ email, username, dob }, callback) => {
    try{
        // Check all feilds are filled
        switch(''){
            case email:
                return callback('Email is required');
            case username:
                return callback('Username is required');
                return;
            case dob:
                return callback('Date of Birth is required');
        }

        // Check user is old enough
        if(ageInYears(dob) < 13){
            return callback('You must be 13 years or older to sign up');
        }

        // Check server if email, and username are valid
        await froyoApi.get(`/auth/validEmail/${email}`);
        await froyoApi.get(`/auth/validUsername/${username}`);
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
};

// Create an account & sign in
const signUp = (dispatch) => async (info, callback) => {
    try{
        const {
            email,
            username,
            dob,
            first_name,
            last_name,
            password,
            passwordConfirm
        } = info;
        // Check all feilds are filled
        switch(''){
            case first_name:
                return callback('Must enter a first name');
            case last_name:
                return callback('Must enter a last name');
            case password:
                return callback('Must enter a password');
            case passwordConfirm:
                return callback('Must confirm password');
        }
        // Make sure passwords match
        if(password !== passwordConfirm){
            return callback('Passwords must match');
        }
        // Create the user and store their authentication token
        const { headers: { authorization } } = await froyoApi.post('/users/', { email, username, dob, first_name, last_name, password });
        const token = authorization.replace('Bearer ', '');
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'sign_in', payload: token});
        callback();
    }
    catch(err){
        callback(err.response.data);
    }
};

// Clear token from AsyncStorage
const signOut = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'sign_out' });
    navigate('Welcome');
};

// Get a user's information given their auth token
const getUserById = (dispatch) => async (id, callback) => {
    try{
        const { data: user } = await froyoApi.get(`/users/${id}`);
        callback(user);
    }
    catch(err){
        callback(null, err.response.data);
    }
};

// Update a user's information
const updateUserInfo = () => async (info, callback) => {
    try{
        const {
            firstName,
            lastName,
            username,
            description
        } = info;
        // Check all required fields are filled
        switch(''){
            case firstName:
                return callback('Must enter a first name');
            case lastName:
                return callback('Must enter a last name');
            case username:
                return callback('Must enter a username');
        }
        await froyoApi.put('/users', {
            first_name: firstName,
            last_name: lastName,
            username,
            description
        });
        callback();
    }
    catch(err){
        callback(err.response.data);
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
        if(err+'' === 'Error: Network Error'){
            navigate('NoWifi');
        }
        else{
            navigate('Welcome');
        }
    }
};

// Follow a user. Unfollows if the user is already following them
const follow = () => async (targetUser, callback) => {
    try{
        await froyoApi.put(`/users/${targetUser}/follow`);
        callback();
    }
    catch (err) {
        callback(err);
    }
};

// Get whether userA is following userB
const following = () => async (userA, userB, callback) => {
    try{
        const { data: following } = await froyoApi.get(`/users/${userA}/following/${userB}`);
        callback(following);
    }
    catch (err) {
        callback(null, err);
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        signIn,
        continueSignUp,
        signUp,
        checkSignedIn,
        signOut,
        getUserById,
        updateUserInfo,
        follow,
        following
    }, { user: {} }
);


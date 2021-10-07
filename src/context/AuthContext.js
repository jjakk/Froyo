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
        case 'load_post':
            return { ...state, post: action.payload, errorMessage: '' }
        case 'load_posts':
            return { ...state, posts: action.payload, errorMessage: '' }
        default:
            return state;
    }
};

// For all functions: If callback parameter is true, task succeeded; if false, task failed

// Sign in with email and password
const signIn = (dispatch) => async ({ email, password }, callback) => {
    try{
        const response = await froyoApi.post('/auth/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'sign_in', payload: response.data.token });
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
        const checkEmail = await froyoApi.post('/auth/checkEmail', { email });
        const checkUsername = await froyoApi.post('/auth/checkUsername', { username });
        callback(true);
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
        const { email, username, dob, firstName, lastName, password, passwordConfirm } = info;
        // Check all feilds are filled
        switch(''){
            case firstName:
                dispatch({ type: 'add_error', payload: 'Must enter a first name' });
                callback(false);
                return;
            case lastName:
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
        const response = await froyoApi.post('/auth/signup', { email, username, dob, firstName, lastName, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'sign_in', payload: response.data.token });
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

// Create a post
const createPost = (dispatch) => async (info, callback) => {
    try{
        const { postBody } = info;
        const response = await froyoApi.post('/posts', { body: postBody });
        callback(true);
    }
    catch(err){
        let message = err.response.data;
        dispatch({ type: 'add_error', payload: message });
        callback(false);
    }
};

const deletePost = (dispatch) => async (postId, callback) => {
    try{
        await froyoApi.delete(`/posts/${postId}`);
        callback(true);
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Unable to delete post` })
        callback(false);
    }
}

// Get all the posts of a given user
const getUserPosts = (dispatch) => async () => {
    try{
        const response = await froyoApi.get('/posts');
        dispatch({ type: 'load_posts', payload: response.data });
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
};

// Get a post given it's ID
const getPost = (dispatch) => async (postId) => {
    try{
        const response = await froyoApi.get(`/posts/${postId}`);
        const authorName = await froyoApi.get(`/users/${response.data.userId}`);
        const post = { ...response.data, authorName };
        console.log(post);
        dispatch({ type: 'load_post', payload: post });
    }
    catch(err){
        dispatch({ type: 'add_error', payload: `Ran into an error: ${err}` })
    }
}

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
    {
        signIn,
        continueSignUp,
        signUp,
        checkSignedIn,
        signOut,
        getPost,
        createPost,
        deletePost,
        getUserPosts,
        getUserInfo,
        updateUserInfo,
        clearErrorMessage
    },
    { /*isSignedIn: false,*/
        user: {},
        post: {},
        errorMessage: '',
        posts: []
    }
);


import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "../createDataContext";
import { navigate } from "@froyo/navigation-ref";
// API
import froyoApi from "../../api/froyo";
import formRequest from "../../api/formRequest";
// Helpers
import { ageInYears } from "@froyo/helpers";
import { Alert } from "react-native";

// Handle setting state
const userReducer = (state, action) => {
    switch(action.type){
        case "sign_in":
            return { ...state, token: action.payload };
        case "sign_out":
            return { ...state, token: null };
        case "set_user_info":
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

// Sign in with email and password
const signIn = (dispatch) => async ({ email, password, notificationToken }) => {
    // Check that all fields are complete first
    switch(""){
        case email:
            throw new Error("Must provide an email");
        case password:
            throw new Error("Must provide a password");
    }
    try {
        // Get authentication token from API
        const { headers: { authorization } } = await froyoApi.post("/auth/login", { email, password, notificationToken });
        const token = authorization.replace("Bearer ", "");
        await AsyncStorage.setItem("token", token);
        dispatch({ type: "sign_in", payload: token });
    }
    catch (err) {
        throw Error(err.response.data || err.message);
    }
};

// Verify that the information from the first page of sign up is valid
const continueSignUp = () => async ({ email, username, dob }) => {
    // Check all feilds are filled
    switch(""){
        case email:
            throw new Error("Email is required");
        case username:
            throw new Error("Username is required");
        case dob:
            throw new Error("Date of Birth is required");
    }

    // Check user is old enough
    if(ageInYears(dob) < 13){
        throw new Error("You must be 13 years or older to sign up");
    }

    try {
        // Verify that email, and username are valid
        await froyoApi.get(`/auth/validateParameter/email/${email}`);
        await froyoApi.get(`/auth/validateParameter/username/${username}`);
    }
    catch (err) {
        console.log(err);
        throw Error(err.response.data || err.message);
    }
};

// Create an account & sign in
const signUp = (dispatch) => async (info) => {
    const {
        email,
        username,
        dob,
        first_name,
        last_name,
        password,
        passwordConfirm,
        notificationToken
    } = info;

    // Check all feilds are filled
    switch(""){
        case first_name:
            throw new Error("Must enter a first name");
        case last_name:
            throw new Error("Must enter a last name");
        case password:
            throw new Error("Must enter a password");
        case passwordConfirm:
            throw new Error("Must confirm password");
    }

    // Make sure passwords match
    if(password !== passwordConfirm){
        throw new Error("Passwords must match");
    }

    try{
        // Create the user and store their authentication token
        const {
            headers: { authorization }
        } = await froyoApi.post("/users/", {
            email,
            username,
            dob,
            first_name,
            last_name,
            password,
            notificationToken
        });
        const token = authorization.replace("Bearer ", "");
        await AsyncStorage.setItem("token", token);
        dispatch({ type: "sign_in", payload: token}); 
    }
    catch (err) {
        throw Error(err.response.data || err.message);
    }
};

// Clear token from AsyncStorage
const signOut = (dispatch) => async (notificationToken) => {
    try{
        await froyoApi.post("/auth/logout", { notificationToken });
        // Remove all AsyncStorage items
        const keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.multiRemove(keys);

        // Clear the token from state
        dispatch({ type: "sign_out" });
        navigate("ResolveAuth");
    }
    catch(err) {
        console.log(err);
        Alert.alert(err.message);
    }
};

// Delete a user from the database and sign out
const deleteUser = (dispatch) => async () => {
    await froyoApi.delete("/users");
    signOut(dispatch)();
};

// Get a user's information given their ID
const getUser = () => async (id) => {
    const { data: user } = await froyoApi.get(`/users/${id}`);
    return user;
};

const searchUser = () => async (query) => {
    const { data: users } = await froyoApi.get(`/users`, {
        params: query
    });
    return users;
};

// Update a user's information
const updateUser = (dispatch) => async (info) => {
    const {
        firstName,
        lastName,
        username,
        description,
        image
    } = info;
    
    // Check all required fields are filled
    switch(""){
        case firstName:
            throw new Error("Must enter a first name");
        case lastName:
            throw new Error("Must enter a last name");
        case username:
            throw new Error("Must enter a username");
    }

    await formRequest("put", "/users", {
        first_name: firstName,
        last_name: lastName,
        username,
        description,
        image
    });
    const { data: userId } = await froyoApi.get("/");
    const { data: user } = await froyoApi.get(`/users/${userId}`);
    dispatch({ type: "set_user_info", payload: user });
};

const resetPassword = () => async (email) => {
    await froyoApi.put("/auth/resetPassword", { email });
};

// Goes to either your feed or welcome page depending on whether you are logged in
const checkSignedIn = (dispatch) => async () => {
    try{
        const { data: userId } = await froyoApi.get("/");
        const { data: user } = await froyoApi.get(`/users/${userId}`);
        if (typeof(user) === "object") {
            dispatch({ type: "set_user_info", payload: user });
            navigate("mainFlow");
        }
        else {
            throw new Error("");
        }
    }
    catch(err){
        if(err+"" === "Error: Network Error"){
            navigate("NoWifi");
        }
        else{
            navigate("Welcome");
        }
    }
};

// Follow a user. Unfollows if the user is already following them
const follow = () => async (targetUser) => {
    await froyoApi.put(`/users/${targetUser}/follow`);
};

// Get whether userA is following userB
const following = () => async (userA, userB) => {
    const { data: following } = await froyoApi.get(`/users/${userA}/following/${userB}`);
    return following;
};

// Get followers and those folowing a user
const getConnections = () => async (userId) => {
    const { data: connections } = await froyoApi.get(`/users/${userId}/connections`);
    return connections;
};

export const { Provider, Context } = createDataContext(
    userReducer,
    {
        signIn,
        continueSignUp,
        signUp,
        checkSignedIn,
        signOut,
        deleteUser,
        getUser,
        searchUser,
        updateUser,
        resetPassword,
        follow,
        following,
        getConnections
    }, { user: {} }
);

export const useUser = () => useContext(Context);


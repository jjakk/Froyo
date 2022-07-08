import { useContext } from "react";
import createDataContext from "../createDataContext";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from "react-native";

// Handle setting state
const notificationReducer = (state, action) => {
    switch(action.type){
        case "set_token":
            return { ...state, notificationToken: action.payload };
        default:
            return state;
    }
};

const setNotificationToken = (dispatch) => () => {
    registerForPushNotifications()
    .then(token => {
        dispatch({ type: "set_token", payload: token });
    })
    .catch(err => {
        Alert.alert(err);
    });
};

// Helper Functions

const registerForPushNotifications = async () => {
    if(!Device.isDevice) return null;

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return null;

    if(Platform.OS === "android"){
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token;
};

export const { Provider, Context } = createDataContext(
    notificationReducer,
    {
        setNotificationToken
    }, {
        notificationToken: null
    }
);

export const useNotification = () => useContext(Context);


import React, { useReducer, useEffect } from "react";
import { Alert, Appearance, Platform } from "react-native";
// Expo
import { useFonts } from "expo-font";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
// Navigation
import AppNavigator from "./src/navigation/appNavigator";
// Context
import { Provider as UserProvider } from "@froyo/user-context";
import { Provider as ContentProvider } from "@froyo/content-context";
import { Provider as ChatProvide } from "@froyo/chat-context";
import { Provider as SettingsProvider } from "@froyo/settings-context";

const App = () => {
  // Import custom fonts
  const [loaded] = useFonts({
    "Nunito": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-Light": require("./assets/fonts/Nunito/Nunito-Light.ttf"),
  });
  
  // Reload all components when theme changes
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const onThemeChange = () => {
      forceUpdate();
  };

  const registerForPushNotifications = async () => {
    if(!Constants.isDevice){
      Alert.alert("Push Notifications are not supported on device simulators");
      return null;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission for notifications was denied");
      return null;
    }

    if(Platform.OS === "android"){
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token;
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(onThemeChange);
    registerForPushNotifications().then(token => {
      console.log(token);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    loaded ? (
      <UserProvider>
        <ContentProvider>
          <SettingsProvider>
            <ChatProvide>
              <AppNavigator/>
            </ChatProvide>
          </SettingsProvider>
        </ContentProvider>
      </UserProvider>
      ) : null
  );
}

export default App;

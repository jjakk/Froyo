import React, { useReducer, useEffect } from "react";
import { Appearance } from "react-native";
// Expo
import { useFonts } from "expo-font";
// Navigation
import AppNavigator from "./src/navigation/appNavigator";
// Context
import { Provider as UserProvider } from "@froyo/user-context";
import { Provider as ContentProvider } from "@froyo/content-context";
import { Provider as ChatProvide } from "@froyo/chat-context";
import { Provider as SettingsProvider } from "@froyo/settings-context";
import { Provider as NotificationProvider } from "@froyo/notification-context";

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

  useEffect(() => {
    const subscription = Appearance.addChangeListener(onThemeChange);

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
              <NotificationProvider>
                <AppNavigator/>
              </NotificationProvider>
            </ChatProvide>
          </SettingsProvider>
        </ContentProvider>
      </UserProvider>
      ) : null
  );
}

export default App;

import React, { useEffect } from "react";
import { Alert, Appearance, Platform } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
// SafeAreaProvider
import {
    SafeAreaProvider,
    initialWindowMetrics
} from "react-native-safe-area-context";
// Set Navigator
import { setNavigator } from "@froyo/navigation-ref";
// Miscellaneous Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import NoWifiScreen from "../screens/NoWifiScreen";
// Authentication Screens
import ResolveAuthScreen from "../screens/authentication/ResolveAuthScreen";
// Navigators
import mainNavigator from "./navigators/mainNavigator";
import authNavigator from "./navigators/authNavigator";
// Context
import { useSettings } from "@froyo/settings-context";
import { useNotification } from "@froyo/notification-context";
// Constants
import { colors } from "@froyo/constants";

// This is the root navigator
const appNavigator = (hideFeed) => createSwitchNavigator({
    // Miscellaneous (external) screens
    ResolveAuth: ResolveAuthScreen,
    NoWifi: NoWifiScreen,
    Welcome: WelcomeScreen,
    // Flows
    authFlow: authNavigator,
    mainFlow: mainNavigator(hideFeed)
});

const WithFeedApp = createAppContainer(appNavigator(false));
const WithoutFeedApp = createAppContainer(appNavigator(true));

const AppNavigator = () => {
    // Context
    const { state: { hideFeed } } = useSettings();
    const { setNotificationToken } = useNotification();
    // Theme
    const theme = Appearance.getColorScheme();
    const AppContainer = hideFeed ? WithoutFeedApp : WithFeedApp;

    useEffect(() => {
        setNotificationToken();
    }, []);

    return (
        <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={{
                backgroundColor: theme === "dark" ? colors.dark.THIRD : colors.WHITE
            }}
        >
            <AppContainer
                theme={theme}
                hideFeed={false}
                ref={(navigator) => { setNavigator(navigator) }}
            />
        </SafeAreaProvider>
    );
};

export default AppNavigator;


import React from 'react';
import { Appearance } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// SafeAreaProvider
import {
    SafeAreaProvider,
    initialWindowMetrics
} from 'react-native-safe-area-context';
// Set Navigator
import { setNavigator } from './navigationRef';
// Miscellaneous Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import NoWifiScreen from '../screens/NoWifiScreen';
// Authentication Screens
import ResolveAuthScreen from '../screens/authentication/ResolveAuthScreen';
// Navigators
import mainNavigator from './navigators/mainNavigator';
import authNavigator from './navigators/authNavigator';
// Constants
import { colors } from '../constants/constants';

// This is the root navigator
const appNavigator = createSwitchNavigator({
    // Miscellaneous (external) screens
    ResolveAuth: ResolveAuthScreen,
    NoWifi: NoWifiScreen,
    Welcome: WelcomeScreen,
    // Flows
    authFlow: authNavigator,
    mainFlow: mainNavigator
});

const AppContainer = createAppContainer(appNavigator);
const AppNavigator = () => {
    // Theme
    const theme = Appearance.getColorScheme();

    return (
        <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={{
                backgroundColor: theme === 'dark' ? colors.dark.THIRD : colors.WHITE
            }}
        >
            <AppContainer
                theme={theme}
                ref={(navigator) => { setNavigator(navigator) }}
            />
        </SafeAreaProvider>
    );
};

export default AppNavigator;


import React from 'react';
import { Appearance } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// SafeAreaProvider
import {
    SafeAreaProvider,
    initialWindowMetrics
} from 'react-native-safe-area-context';
// Set Navigator
import { setNavigator } from './navigationRef';
// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NoWifiScreen from '../screens/NoWifiScreen';
// Authentication Screens
import ResolveAuthScreen from '../screens/authentication/ResolveAuthScreen';
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpOneScreen from '../screens/authentication/signUp/SignUpOneScreen';
import SignUpTwoScreen from '../screens/authentication/signUp/SignUpTwoScreen';
import ResetPasswordScreen from '../screens/authentication/ResetPasswordScreen';
// Acccount Screens
import AccountViewScreen from '../screens/account/AccountViewScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';
// Settings Screen
import SettingsScreen from '../screens/SettingsScreen';
// Post Screens
import PostFeedScreen from '../screens/post/PostFeedScreen';
import PostCreateScreen from '../screens/post/PostCreateScreen';
import PostEditScreen from '../screens/post/PostEditScreen';
import PostViewScreen from '../screens/post/PostViewScreen';
// Meetup Screens
import MeetupFeedScreen from '../screens/meetup/MeetupFeedScreen';
// Icons
import MeetupIcon from '../../assets/icons/Meetup.svg';
import HomeIcon from '../../assets/icons/Home.svg';
import SearchIcon from '../../assets/icons/Search.svg';
// Constants
import { sizes, colors } from '../constants/constants';

// This navigator organized the two sign up screens
const signUpNavigator = createStackNavigator({
        SignUpOne: SignUpOneScreen,
        SignUpTwo: SignUpTwoScreen
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    },
});

// This navigator organizes the bottom tab bar
const tabNavigator = createBottomTabNavigator({
    Feed: {
        screen: PostFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                    <HomeIcon
                        color={tintColor}
                        height={sizes.TAB_ICON}
                        width={sizes.TAB_ICON*2}
                    />
                ))
        }
    },
    MeetupFeed: {
        screen: MeetupFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <MeetupIcon
                    color={tintColor}
                    height={sizes.TAB_ICON}
                    width={sizes.TAB_ICON*2}
                />
            ))
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <SearchIcon
                    color={tintColor}
                    height={sizes.TAB_ICON}
                    width={sizes.TAB_ICON*2}
                />
            ))
        }
    },
    }, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: colors.GREEN,
        style: {
            height: 60
        }
    },
    initialRouteName: 'Feed'
});

// This navigator connects the tabFlow to the other screens
const mainNavigator = createStackNavigator({
        tabFlow: tabNavigator,
        // Account Screens
        AccountEdit: AccountEditScreen,
        AccountView: AccountViewScreen,
        // Settings Screen
        Settings: SettingsScreen,
        // Post Screens
        PostCreate: PostCreateScreen,
        PostView: PostViewScreen,
        PostEdit: PostEditScreen,
        // Meetup Screens
        MeetupChat: (() => null),
        MeetupGallery: (() => null),
        MeetupSettings: (() => null),
    },
    {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

// The navigator organizes the authentication screens
const authNavigator = createStackNavigator({
    SignIn: SignInScreen,
    SignUp: {
        screen: signUpNavigator,
        navigationOptions: {
        headerShown: false
        }
    },
    ResetPassword: ResetPasswordScreen
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    }
});

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
    const theme = Appearance.getColorScheme();

    return (
        <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={{
                backgroundColor: theme === 'dark' ? colors.dark.THIRD : colors.WHITE,
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


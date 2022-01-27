import React from 'react';
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
import FeedScreen from '../screens/FeedScreen';
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
import PostCreateScreen from '../screens/post/PostCreateScreen';
import PostEditScreen from '../screens/post/PostEditScreen';
import PostViewScreen from '../screens/post/PostViewScreen';
// Context
import { useSettings } from '../context/SettingsContext';
// Icons
import PlusCircleIcon from '../../assets/icons/Plus-Circle.svg';
import HomeIcon from '../../assets/icons/Home.svg';
import SearchIcon from '../../assets/icons/Search.svg';
// Constants
import { colors } from '../constants/constants';


const signUpNavigator = createStackNavigator({
        SignUpOne: SignUpOneScreen,
        SignUpTwo: SignUpTwoScreen
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    },
});

const homeNavigator = createStackNavigator({
        Feed: FeedScreen,
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
});


const tabNavigator = createBottomTabNavigator({
    Feed: {
        screen: FeedScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <HomeIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    Create: {
        screen: PostCreateScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <PlusCircleIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <SearchIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    }, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#41CA99',
        style: {
            height: 60
        }
    },
    initialRouteName: 'Feed'
});

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
    },
    {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

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
    const { state: { theme } } = useSettings();

    return (
        <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={{
                backgroundColor: theme === 'light' ? colors.WHITE : colors.dark.THIRD,
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


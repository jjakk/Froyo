import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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
// Post Screens
import PostCreateScreen from '../screens/post/PostCreateScreen';
import PostEditScreen from '../screens/post/PostEditScreen';
import PostViewScreen from '../screens/post/PostViewScreen';
// Icons
import FroyoIcon from '../../assets/icons/Froyo.svg';
import UserIcon from '../../assets/icons/Profile Picture.svg';
import SearchIcon from '../../assets/icons/Search.svg';


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
    searchFlow: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor, focused }) => (
                <SearchIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    Feed: {
        screen: FeedScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor, focused }) => (
                <FroyoIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    AccountView: {
        screen: AccountViewScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor, focused }) => (
                <UserIcon color={tintColor} height={35} width={35}/>
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
        AccountEdit: AccountEditScreen,
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
    ResolveAuth: ResolveAuthScreen,
    NoWifi: NoWifiScreen,
    Welcome: WelcomeScreen,
    authFlow: authNavigator,
    mainFlow: mainNavigator
});

export default appNavigator;


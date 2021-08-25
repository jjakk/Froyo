import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import FeedScreen from '../screens/FeedScreen';
import PostScreen from '../screens/PostScreen';
// Authentication Screens
import ResolveAuthScreen from '../screens/authentication/ResolveAuthScreen';
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpOneScreen from '../screens/authentication/signUp/SignUpOneScreen';
import SignUpTwoScreen from '../screens/authentication/signUp/SignUpTwoScreen';
import ResetPasswordScreen from '../screens/authentication/ResetPasswordScreen';
//Acccount Screens
import AccountViewScreen from '../screens/account/AccountViewScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';
// Icons
import FroyoIcon from '../../assets/icons/Froyo.svg';
import UserIcon from '../../assets/icons/Profile Picture.svg';
import HomeIcon from '../../assets/icons/Home.svg';


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

const feedNavigator = createStackNavigator({
        Feed: FeedScreen,
        Post: PostScreen,
    }, {
    headerMode: 'none',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    }
});

const accountNavigator = createStackNavigator({
    AccountView: AccountViewScreen,
    AccountEdit: AccountEditScreen
    },{
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
});

const mainNavigator = createBottomTabNavigator({
    homeFlow: {
        screen: PostScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor, focused }) => (
                <HomeIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    feedFlow: {
        screen: feedNavigator,
        navigationOptions: {
            tabBarIcon: (({ tintColor, focused }) => (
                <FroyoIcon color={tintColor} height={35} width={35}/>
            ))
        }
    },
    accountFlow: {
        screen: accountNavigator,
        navigationOptions: {
            tabBarIcon: (({ tintColor, focused }) => (
                <UserIcon color={tintColor} height={35} width={35}/>
            ))
        }
    }
    }, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#41CA99',
        style: {
            height: 60
        }
    },
    initialRouteName: 'feedFlow'
});

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
    Welcome: WelcomeScreen,
    authFlow: authNavigator,
    mainFlow: mainNavigator
});

export default appNavigator;


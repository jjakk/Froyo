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
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


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
        Feed: FeedScreen
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
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
        screen: homeNavigator,
        navigationOptions: {
        tabBarIcon: (({ tintColor }) => (
            <Entypo name='home' color={tintColor} size={32} />
        ))
        }
    },
    PostScreen: {
        screen: PostScreen,
        navigationOptions: {
        tabBarIcon: (({ tintColor }) => (
            <AntDesign name='pluscircle' color={tintColor} size={32} />
        ))
        }
    },
    accountFlow: {
        screen: accountNavigator,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <Feather name='user' color={tintColor} size={32} />
            ))
        }
    }
    }, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#41CA99'
    },
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


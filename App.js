import _ from 'denodeify';
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useFonts } from 'expo-font';
// Navigation
import { setNavigator } from './src/navigationRef';
// Context
import { Provider as AuthProvider } from './src/context/AuthContext';
// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import FeedScreen from './src/screens/FeedScreen';
import PostScreen from './src/screens/PostScreen';
// Authentication Screens
import ResolveAuthScreen from './src/screens/authentication/ResolveAuthScreen';
import SignInScreen from './src/screens/authentication/SignInScreen';
import SignUpOneScreen from './src/screens/authentication/signUp/SignUpOneScreen';
import SignUpTwoScreen from './src/screens/authentication/signUp/SignUpTwoScreen';
import ResetPasswordScreen from './src/screens/authentication/ResetPasswordScreen';
//Acccount Screens
import AccountViewScreen from './src/screens/account/AccountViewScreen';
import AccountEditScreen from './src/screens/account/AccountEditScreen';
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
  },
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Welcome: WelcomeScreen,
  authFlow: authNavigator,
  mainFlow: mainNavigator
});


const App = createAppContainer(switchNavigator);

export default () => {
  // Import custom fonts
  const [loaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
  });

  return (
    loaded ? (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AuthProvider>
            <App ref={(navigator) => { setNavigator(navigator) }} />
          </AuthProvider>
        </SafeAreaProvider>
      ) : null
  );
}

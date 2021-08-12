import _ from 'denodeify';
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { createStackNavigator } from 'react-navigation-stack';
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
import SignUpScreenOne from './src/screens/authentication/SignUpScreenOne';
import SignUpScreenTwo from './src/screens/authentication/SignUpScreenTwo';
import ResetPasswordScreen from './src/screens/authentication/ResetPasswordScreen';
//Acccount Screens
import AccountViewScreen from './src/screens/account/AccountViewScreen';
import AccountEditScreen from './src/screens/account/AccountEditScreen';
// Icons
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Welcome: WelcomeScreen,
  authFlow: createStackNavigator({
    SignIn: SignInScreen,
    SignUpOne: SignUpScreenOne,
    SignUpTwo: SignUpScreenTwo,
    ResetPassword: ResetPasswordScreen
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow: {
      screen: createStackNavigator({
        Feed: FeedScreen
      }),
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
      screen: createStackNavigator({
        AccountView: AccountViewScreen,
        AccountEdit: AccountEditScreen
      }),
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
  })
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

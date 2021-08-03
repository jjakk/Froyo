import _ from 'denodeify';
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useFonts } from 'expo-font';
// Navigation
import { setNavigator } from './src/navigationRef';
// Context
import { Provider as AuthProvider } from './src/context/AuthContext';
// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
// Authentication Screens
import ResolveAuthScreen from './src/screens/authentication/ResolveAuthScreen';
import SignInScreen from './src/screens/authentication/SignInScreen';
import SignUpScreen from './src/screens/authentication/SignUpScreen';
import ResetPasswordScreen from './src/screens/authentication/ResetPasswordScreen';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
//Acccount Screens
import AccountViewScreen from './src/screens/account/AccountViewScreen';
import AccountEditScreen from './src/screens/account/AccountEditScreen';
// Icons
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  appFlow: createAnimatedSwitchNavigator({
    Welcome: WelcomeScreen,
    authFlow: createStackNavigator({
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
      ResetPassword: ResetPasswordScreen
    }),
    mainFlow: createBottomTabNavigator({
      homeFlow: {
        screen: createStackNavigator({
          Home: HomeScreen
        }),
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: (({ tintColor }) => (
            <Entypo name='home' color={tintColor} size={24} />
          ))
        }
      },
      accountFlow: {
        screen: createStackNavigator({
          AccountView: AccountViewScreen,
          AccountEdit: AccountEditScreen
        }),
        navigationOptions: {
          tabBarLabel: 'Account',
          tabBarIcon: (({ tintColor }) => (
            <Feather name='user' color={tintColor} size={24} />
          ))
        }
      }
    })
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
        <AuthProvider>
          <App ref={(navigator) => { setNavigator(navigator) }} />
        </AuthProvider>
      ) : null
  );
}

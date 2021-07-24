import _ from 'denodeify';
import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// Navigation
import { setNavigator } from './src/navigationRef';
// Context
import { Provider as AuthProvider } from './src/context/AuthContext';
// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
// Authentication Screens
import ResolveAuthScreen from './src/screens/authentication/ResolveAuthScreen';
import SignInScreen from './src/screens/authentication/SignInScreen';
import SignUpScreen from './src/screens/authentication/SignUpScreen';
import ResetPasswordScreen from './src/screens/authentication/ResetPasswordScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Welcome: WelcomeScreen,
  authFlow: createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPasswordScreen: ResetPasswordScreen
  }),
  /*mainFlow: createBottomTabNavigator({
    conversationsFlow: {
      screen: createStackNavigator({
        Conversations: ConversationsScreen
      }),
      navigationOptions: {
        tabBarLabel: 'Conversations',
        tabBarIcon: (({ tintColor }) => (
          <Feather name='message-circle' color={tintColor} size={24} />
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
  })*/
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  );
}

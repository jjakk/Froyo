import _ from 'denodeify';
import React from 'react';
import {
  createAppContainer
} from 'react-navigation';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import { useFonts } from 'expo-font';
// Navigation
import { setNavigator } from './src/navigation/navigationRef';
import appNavigator from './src/navigation/appNavigator';
// Context
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as PostProvider } from './src/context/PostContext';


const App = createAppContainer(appNavigator);

export default () => {
  // Import custom fonts
  const [loaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
  });

  return (
    loaded ? (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <MenuProvider>
            <AuthProvider>
              <PostProvider>
                <App ref={(navigator) => { setNavigator(navigator) }} />
              </PostProvider>
            </AuthProvider>
          </MenuProvider>
        </SafeAreaProvider>
      ) : null
  );
}

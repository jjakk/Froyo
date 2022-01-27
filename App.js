import _ from 'denodeify';
import React from 'react';
import { useFonts } from 'expo-font';
// Navigation
import AppNavigator from './src/navigation/appNavigator';
// Theme
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
// Context
import { Provider as UserProvider } from './src/context/UserContext';
import { Provider as ContentProvider } from './src/context/ContentContext';
import { Provider as SettingsProvider } from './src/context/SettingsContext';

const App = () => {
  // Import custom fonts
  const [loaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
  });
  const theme = 'dark'//useColorScheme();

  return (
    loaded ? (
      <AppearanceProvider>
        <UserProvider>
          <ContentProvider>
            <SettingsProvider>
              <AppNavigator/>
            </SettingsProvider>
          </ContentProvider>
        </UserProvider>
      </AppearanceProvider>
      ) : null
  );
}

export default App;

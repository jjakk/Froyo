import React, { useReducer, useEffect } from 'react';
import { Appearance } from 'react-native';
import { useFonts } from 'expo-font';
// Navigation
import AppNavigator from './src/navigation/AppNavigator';
// Context
import { Provider as UserProvider } from './src/context/UserContext';
import { Provider as ContentProvider } from './src/context/ContentContext';

const App = () => {
  // Import custom fonts
  const [loaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
  });
  
  // Reload all components when theme changes
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const onThemeChange = () => {
      forceUpdate();
  };
  useEffect(() => {
      Appearance.addChangeListener(onThemeChange);
      return () => {
          Appearance.removeChangeListener(onThemeChange)
      };
  }, []);

  return (
    loaded ? (
      <UserProvider>
        <ContentProvider>
            <AppNavigator/>
        </ContentProvider>
      </UserProvider>
      ) : null
  );
}

export default App;

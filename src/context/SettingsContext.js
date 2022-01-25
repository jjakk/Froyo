import { useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';

// Handle setting state
const settingsReducer = (state, action) => {
    switch(action.type){
        case 'set_theme':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};

// Set dark mode to on (true) or off (false)
const setTheme = (dispatch) => async (theme) => {
    await AsyncStorage.setItem('theme', theme);
    dispatch({ type: 'set_theme', payload: theme });
};

// Attach all settings options to context state
const getSettings = (dispatch) => async () => {
    let theme = await AsyncStorage.getItem('theme');
    if (theme) {
        dispatch({ type: 'set_theme', payload: theme });
    }
    else {
        dispatch({ type: 'set_theme', payload: 'light' });
    }
};

export const { Provider, Context } = createDataContext(
    settingsReducer,
    {
        setTheme,
        getSettings
    }, {
        theme: 'light'
    }
);

export const useSettings = () => useContext(Context);

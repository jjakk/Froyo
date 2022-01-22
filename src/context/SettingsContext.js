import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';

// Handle setting state
const settingsReducer = (state, action) => {
    switch(action.type){
        case 'set_dark_mode':
            return { ...state, darkModeEnabled: action.payload };
        default:
            return state;
    }
};

// Set dark mode to on (true) or off (false)
const setDarkModeEnable = (dispatch) => async (darkModeEnabled) => {
    await AsyncStorage.setItem('darkModeEnabled', darkModeEnabled.toString());
    dispatch({ type: 'set_dark_mode', payload: darkModeEnabled });
};

// Attach all settings options to context state
const getSettings = (dispatch) => async () => {
    let darkModeEnabled = await AsyncStorage.getItem('darkModeEnabled');
    // Str -> Bool
    darkModeEnabled = darkModeEnabled.toLowerCase() === 'true' ? true : false;
    dispatch({ type: 'set_dark_mode', payload: darkModeEnabled });
};

export const { Provider, Context } = createDataContext(
    settingsReducer,
    {
        setDarkModeEnable,
        getSettings
    }, {
        darkModeEnabled: false
    }
);

import { useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';

const DEFAULT_SETTINGS = {
    flavor: 'mint',
    hideFeed: false
};

// Handle setting state
const settingsReducer = (state, action) => {
    switch(action.type){
        case 'setSettings':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

// Getters

// Gets settings from storage & sets context
const getSettings = (dispatch) => async () => {
    // Flavor
    let flavor = await AsyncStorage.getItem('flavor') || DEFAULT_SETTINGS.flavor;

    // Hide Feed
    let hideFeed = JSON.parse(await AsyncStorage.getItem('hideFeed')) || DEFAULT_SETTINGS.hideFeed;
    
    // Set context
    dispatch({
        type: 'setSettings',
        payload: {
            flavor,
            hideFeed
        }
    });
};

// Setters

const setFlavor = (dispatch) => async (newFlavor) => {
    await AsyncStorage.setItem('flavor', newFlavor);

    dispatch({
        type: 'setSettings',
        payload: {
            flavor
        }
    });
};

const setHideFeed = (dispatch) => async (newHideFeed) => {
    // Set new value to context
    dispatch({
        type: 'setSettings',
        payload: {
            hideFeed: newHideFeed
        }
    });

    // Save new valu to storage
    await AsyncStorage.setItem('hideFeed', JSON.stringify(newHideFeed));
};

export const { Provider, Context } = createDataContext(
    settingsReducer,
    {
        getSettings,
        setFlavor,
        setHideFeed
    },
    DEFAULT_SETTINGS
);

export const useSettings = () => useContext(Context);


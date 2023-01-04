import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "../createDataContext";
// Constants
import { colors } from "@froyo/constants";

const DEFAULT_SETTINGS = {
    flavor: "mint",
    hideFeed: false
};

// Handle setting state
const settingsReducer = (state, action) => {
    switch(action.type){
        case "setSettings":
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
    let flavor = await AsyncStorage.getItem("flavor") || DEFAULT_SETTINGS.flavor;

    // Hide Feed
    let hideFeed = JSON.parse(await AsyncStorage.getItem("hideFeed"));
    if(hideFeed === null) hideFeed = DEFAULT_SETTINGS.hideFeed;
    
    // Set context
    dispatch({
        type: "setSettings",
        payload: {
            flavor,
            primaryColors: colors.flavors[flavor],
            hideFeed
        }
    });
};

// Setters

const setFlavor = (dispatch) => async (newFlavor) => {
    dispatch({
        type: "setSettings",
        payload: {
            flavor: newFlavor,
            primaryColors: colors.flavors[newFlavor],
        }
    });

    await AsyncStorage.setItem("flavor", newFlavor);
};

const setHideFeed = (dispatch) => async (newHideFeed) => {
    dispatch({
        type: "setSettings",
        payload: {
            hideFeed: newHideFeed
        }
    });

    await AsyncStorage.setItem("hideFeed", JSON.stringify(newHideFeed));
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


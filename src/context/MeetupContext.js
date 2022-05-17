import { useContext } from "react";
import createDataContext from "./createDataContext";
// API
import froyoApi from "../api/froyo";
import formRequest from "../api/formRequest";

// Handle setting state
const meetupReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

// TODO
const createMeetup = () => (info) => {
    return;
};

export const { Provider, Context } = createDataContext(
    meetupReducer,
    {
        createMeetup
    }, {}
);

export const useMeetup = () => useContext(Context);


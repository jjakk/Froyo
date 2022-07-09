import { useContext } from "react";
import createDataContext from "../createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// API
import froyoApi from "../../api/froyo";

const contentReducer = (state, action) => {
    switch(action.type){
        case 'set_unread_message':
            return { ...state, unreadMessage: action.payload };
        default:
            return state;
    }
};

const getPersonalChats = () => async () => {
    try{
        const { data: chats } = await froyoApi.get("/chats");
        chats.filter(chat=>!chat.expiration);
        return chats;
    }
    catch (err) {
        throw new Error(err.response.data);
    }
};

const getChatMessages = () => async (chatId) => {
    try{
        const { data: messages } = await froyoApi.get(`/chats/${chatId}/messages`);
        return messages;
    }
    catch (err) {
        throw new Error(err.response.data);
    }
};

const createMessage = () => async (chatId, text) => {
    try{
        const { data: message } = await froyoApi.post(`/chats/${chatId}/messages`, { text });
        return message;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const createChat = () => async (data) => {
    try{
        await froyoApi.post("/chats/", data);
    }
    catch (err) {
        throw new Error(err.response.data);
    }
};

const getChat = () => async (chatId) => {
    try{
        const { data: chat } = await froyoApi.get(`/chats/${chatId}`);
        return chat;
    }
    catch (err) {
        throw new Error(err.response.data);
    }
};

const deleteChat = () => async (chatId) => {
    try{
        await froyoApi.delete(`/chats/${chatId}`);
    }
    catch (err) {
        throw new Error(err.response.data);
    }
};

const setUnreadMessage = (dispatch) => () => {
    dispatch({ type: "set_unread_message", payload: true });
};

const clearUnreadMessage = (dispatch) => () => {
    dispatch({ type: "set_unread_message", payload: false });
};

export const { Provider, Context } = createDataContext(
    contentReducer,
    {
        getPersonalChats,
        getChatMessages,
        createMessage,
        createChat,
        getChat,
        deleteChat,
        setUnreadMessage,
        clearUnreadMessage
    }, { unreadMessage: false }
);

export const useChat = () => useContext(Context);


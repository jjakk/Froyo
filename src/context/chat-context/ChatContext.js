import { useContext } from "react";
import createDataContext from "../createDataContext";
// API
import froyoApi from "../../api/froyo";

const contentReducer = (state, action) => {
    switch(action.type){
        case "add_unread_chat":
            if(state.unreadChats.includes(action.payload)) return state;
            return {
                ...state,
                unreadChats: [
                    ...state.unreadChats,
                    action.payload
                ]
            };
        case "remove_unread_chat":
            return {
                ...state,
                unreadChats: state.unreadChats.filter(chatId => chatId !== action.payload)
            };
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
        throw new Error(err.response.data || err.message);
    }
};

const getChatMessages = () => async (chatId) => {
    try{
        const { data: messages } = await froyoApi.get(`/chats/${chatId}/messages`);
        return messages;
    }
    catch (err) {
        throw new Error(err.response.data || err.mesage);
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
        throw new Error(err.message);
    }
};

const getChat = () => async (chatId) => {
    try{
        const { data: chat } = await froyoApi.get(`/chats/${chatId}`);
        return chat;
    }
    catch (err) {
        throw new Error(err.message);
    }
};

const deleteChat = () => async (chatId) => {
    try{
        await froyoApi.delete(`/chats/${chatId}`);
    }
    catch (err) {
        throw new Error(err.message);
    }
};

const addUnreadChat = (dispatch) => (chatId) => {
    dispatch({ type: "add_unread_chat", payload: chatId });
};

const removeUnreadChat = (dispatch) => (chatId) => {
    dispatch({ type: "remove_unread_chat", payload: chatId });
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
        addUnreadChat,
        removeUnreadChat
    }, { unreadChats: [] }
);

export const useChat = () => useContext(Context);


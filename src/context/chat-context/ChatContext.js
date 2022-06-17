import { useContext } from "react";
import createDataContext from "../createDataContext";
// API
import froyoApi from "../../api/froyo";

const contentReducer = (state, action) => {
    switch(action.type){
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
        await froyoApi.post(`/chats/${chatId}/messages`, { text });
    }
    catch (err) {
        throw new Error(err.response.data);
    }
}

export const { Provider, Context } = createDataContext(
    contentReducer,
    {
        getPersonalChats,
        getChatMessages,
        createMessage
    }, {}
);

export const useChat = () => useContext(Context);


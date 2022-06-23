import React, { useState, useEffect } from "react";
// Components
import { Alert } from "react-native";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { MessageList } from "@froyo/lists";
import { CommentBar } from "@froyo/bars";
// Context
import { useChat } from "@froyo/chat-context";

const ChatMainScreen = (props) => {
    const {
        getChat,
        getChatMessages,
        createMessage
    } = useChat();

    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState([]);

    const {
        navigation
    } = props;

    const chatId = navigation.getParam("chatId");

    const reloadMessages = () => {
        getChatMessages(chatId)
        .then(msgs => {
            setMessages(msgs);
        })
        .catch(err => {
            Alert.alert(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const onSendMessage = (message) => {
        if(message){
            createMessage(chatId, message)
            .then(() => {
                reloadMessages();
            })
            .catch(err => {
                Alert.alert(err.message);
            });
        }
    };

    useEffect(() => {
        getChat(chatId).then(returnedChat => {
            setChat(returnedChat);
        })
        .catch((err) => {
            Alert.alert(err.message);
        })
        .finally(() => {
            reloadMessages();
        });
    }, []);
    
    return (
        <ScreenContainer
            edges={["top", "bottom"]}
        >
            <Header
                title={chat.title || "Chat Name"}
            />
            <MessageList
                messages={messages}
                loading={loading}
            />
            <CommentBar
                onSubmit={onSendMessage}
            />
        </ScreenContainer>
    );
};

export default ChatMainScreen;
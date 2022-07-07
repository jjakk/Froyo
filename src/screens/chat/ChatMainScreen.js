import React, { useState, useEffect } from "react";
// Components
import { Alert } from "react-native";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { MessageList } from "@froyo/lists";
import { CommentBar } from "@froyo/bars";
// Context
import { useChat } from "@froyo/chat-context";
// Web Sockets
import { io } from "socket.io-client";
// Constants
import { API_ENDPOINT } from "@froyo/constants";

const ChatMainScreen = (props) => {
    const {
        getChat,
        getChatMessages,
        createMessage
    } = useChat();

    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState([]);
    const [socket, setSocket] = useState(null);

    const {
        navigation
    } = props;

    const chatId = navigation.getParam("chatId");

    const reloadMessages = () => {
        getChatMessages(chatId)
        .then(msgs => {
            setMessages(msgs.reverse());
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
            .then(msg => {
                socket.emit("message", msg);
            })
            .catch(err => {
                Alert.alert(err.message);
            });
        }
    };

    useEffect(() => {
        const socket = io(API_ENDPOINT);
        setSocket(socket);

        socket.on("connect", () => {
            socket.emit('join-room', chatId);
            
            getChat(chatId)
            .then(chat => {
                setChat(chat);
                reloadMessages();
            })
            .catch(err => {
                Alert.alert(err.message);
            });

            socket.on("message", (message) => {
                console.log(`received message: ${message}`);
                setMessages([message, ...messages]);
            });
        });

        return () => {
            socket.close();
        }
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
                placeholder="Type a message..."
            />
        </ScreenContainer>
    );
};

export default ChatMainScreen;
import React from "react";
// Components
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import MessageList from "../../components/chat/messages/MessageList";
import CommentBar from "../../components/bars/CommentBar";
import { Alert } from "react-native";

const ChatMainScreen = () => {
    const dummyMessages = [
        {
            id: 1,
            text: "Message 1",
            self: true,
        },
        {
            id: 2,
            text: "Message 2",
            self: false,
            authorName: "Alice"
        },
        {
            id: 3,
            text: "Message 3",
            self: true,
        },
        {
            id: 4,
            text: "Message 4",
            self: true,
        },
        {
            id: 5,
            text: "Message 5",
            self: false,
            authorName: "Bob"
        }
    ];

    const onSendMessage = (message) => {
        if(message){
            console.log(message);
            // Set message & update message list
        }
    }; 
    
    return (
        <ScreenContainer
            edges={["top", "bottom"]}
        >
            <Header
                title={"Chat Name"}
            />
            <MessageList
                messages={dummyMessages}
            />
            <CommentBar
                onSubmit={onSendMessage}
            />
        </ScreenContainer>
    );
};

export default ChatMainScreen;
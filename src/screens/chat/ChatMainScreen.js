import React from "react";
// Components
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import MessageList from "../../components/chat/messages/MessageList";

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
        }
    ];
    
    return (
        <ScreenContainer>
            <Header
                title={"Chat Name"}
            />
            <MessageList
                messages={dummyMessages}
            />
        </ScreenContainer>
    );
};

export default ChatMainScreen;
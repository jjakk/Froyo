import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { ChatForm } from "@froyo/forms";

const ChatCreateScreen = () => {

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <ScreenContainer>
            <Header
                title="Create"
            />
            <ChatForm
                onSubmit={onSubmit}
            />
        </ScreenContainer>
    );
};

export default ChatCreateScreen;
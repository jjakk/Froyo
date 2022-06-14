import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { MessageList } from "@froyo/lists";
import { CommentBar } from "@froyo/bars";

const ChatMainScreen = () => {

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
                messages={[]}
            />
            <CommentBar
                onSubmit={onSendMessage}
            />
        </ScreenContainer>
    );
};

export default ChatMainScreen;
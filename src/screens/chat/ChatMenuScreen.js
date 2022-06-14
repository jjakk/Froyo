import React from 'react';
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { ChatPreviewList } from "@froyo/lists";
// Icons
import { PlusIcon } from "@froyo/icons";

const ChatMenuScreen = (props) => {
    const {
        navigation
    } = props;

    const onCreateChat = () => {
        navigation.navigate("ChatCreate");
    };

    return (
        <ScreenContainer>
            <Header
                title="Chat"
                RightIcon={PlusIcon}
                RightIconProps={{
                    onPress: onCreateChat
                }}
            />
            <ChatPreviewList
                chats={[]}
            />
        </ScreenContainer>
    );
};

export default ChatMenuScreen;

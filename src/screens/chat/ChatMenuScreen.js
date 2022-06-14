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

    const dummy_chats = [
        {
            id: "48739281",
            title:"Amphibian Society",
            subtitle:"The gala was awesome",
            members: [
                '123456789',
                '584954894',
            ]
        },
        {
            id: "685940392",
            title:"Bob",
            subtitle:"hello world",
            members: [
                '123456789',
            ]
        },
        {
            id: "594837281",
            title:"Alice",
            subtitle:"world hello",
            members: [
                '584954894',
            ]
        }
    ];

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
                chats={dummy_chats}
            />
        </ScreenContainer>
    );
};

export default ChatMenuScreen;

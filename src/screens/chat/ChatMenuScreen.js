import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import ChatPreviewList from '../../components/chat/ChatPreviewList';
// Icons
import Plus from '../../../assets/icons/Plus.svg';

const ChatMenuScreen = (props) => {
    const {
        navigation
    } = props;

    const onCreateChat = () => {
        navigation.navigate("ChatCreate");
    };

    const dummy_chats = [
        {
            title:"Amphibian Society",
            subtitle:"The gala was awesome",
            members: [
                '123456789',
                '584954894',
            ]
        },
        {
            title:"Bob",
            subtitle:"hello world",
            members: [
                '123456789',
            ]
        },
        {
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
                RightIcon={Plus}
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

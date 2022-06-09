import React from "react";
// Components
import { FlatList } from "react-native";
import ChatPreview from "./ChatPreview";

const ChatPreviewList = (props) => {
    // Props
    const {
        chats
    } = props;

    return (
        <FlatList
            data={chats}
            renderItem={({ item }) => (
                <ChatPreview
                    title={item.title}
                    subtitle={item.subtitle}
                    members={item.members}
                />
            )}
        />
    );
};

export default ChatPreviewList;
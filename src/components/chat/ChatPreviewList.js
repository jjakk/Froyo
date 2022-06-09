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
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    members={item.members}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

export default ChatPreviewList;
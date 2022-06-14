import React from "react";
// Components
import { FlatList } from "@froyo/elements";
import ChatPreview from "../chat/ChatPreview";

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
            emptyMessage="You don't have any chats"
        />
    );
};

export default ChatPreviewList;
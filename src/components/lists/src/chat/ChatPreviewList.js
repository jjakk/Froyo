import React from "react";
// Components
import { FlatList } from "@froyo/elements";
import ChatPreview from "../chat/ChatPreview";

const ChatPreviewList = (props) => {
    // Props
    const {
        chats,
        unReadChats,
        onRefresh,
        ...restOfProps
    } = props;

    return (
        <FlatList
            data={chats}
            RenderComponent={ChatPreview}
            renderItem={({ item }) => (
                <ChatPreview
                    data={item}
                    unread={unReadChats.includes(item.id)}
                    onDelete={onRefresh}
                />
            )}
            emptyMessage="No active chats"
            refreshable
            onRefresh={onRefresh}
            {...restOfProps}
        />
    );
};

export default ChatPreviewList;
import React from "react";
// Components
import { FlatList } from "@froyo/elements";
import ChatPreview from "../chat/ChatPreview";

const ChatPreviewList = (props) => {
    // Props
    const {
        chats,
        loading
    } = props;

    return (
        <FlatList
            data={chats}
            RenderComponent={ChatPreview}
            emptyMessage="No active chats"
            loading={loading}
        />
    );
};

export default ChatPreviewList;
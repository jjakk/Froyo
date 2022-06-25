import React from "react";
// Components
import { FlatList } from "@froyo/elements";
import ChatPreview from "../chat/ChatPreview";

const ChatPreviewList = (props) => {
    // Props
    const {
        chats,
        ...restOfProps
    } = props;

    return (
        <FlatList
            data={chats}
            RenderComponent={ChatPreview}
            emptyMessage="No active chats"
            {...restOfProps}
        />
    );
};

export default ChatPreviewList;
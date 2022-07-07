import React from "react";
// Components
import { StyleSheet } from "react-native";
import { FlatList } from "@froyo/elements";
import Message from "./Message";

const MessageList = (props) => {
    // Props
    const {
        messages
    } = props;

    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            RenderComponent={Message}
            style={styles.container}
            emptyMessage="No messages"
            inverted={messages.length > 0}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
});

export default MessageList;
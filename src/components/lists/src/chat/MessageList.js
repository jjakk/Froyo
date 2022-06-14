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
            renderItem={({ item }) => (
                <Message
                    data={item}
                />
            )}
            style={styles.container}
            emptyMessage="No messages"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});

export default MessageList;
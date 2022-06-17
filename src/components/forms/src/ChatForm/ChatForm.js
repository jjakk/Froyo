import React, { useState } from "react";
// Components
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "@froyo/elements";
import UserSelect from "./UserSelect";

const ChatForm = (props) => {
    const {
        onSubmit
    } = props;

    // State
    const [title, setTitle] = useState("");
    const [members, setMembers] = useState([]);

    const onCreate = () => {
        onSubmit({ title, members });
    };

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="Title"
                style={styles.formElement}
                onChangeText={setTitle}
            />
            <UserSelect
                onChange={setMembers}
            />
            <Button
                title="Create"
                style={styles.formElement}
                onPress={onCreate}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 25
    },
    formElement: {
        marginBottom: 25
    }
});

export default ChatForm;
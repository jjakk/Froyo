import React, { useState } from "react";
// Components
import { View, StyleSheet } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import SearchBar from "../../components/bars/SearchBar";
import { TextInput, Button } from "../../components/froyo-elements";

const ChatCreateScreen = () => {
    const [members, setMembers] = useState();


    const onSearch = (query) => {
        console.log(query);
    };

    return (
        <ScreenContainer>
            <Header
                title="Create"
            />
            <View style={styles.form}>
                <TextInput
                    placeholder="Title"
                    style={styles.formElement}
                />
                <SearchBar
                    placeholder="Members"
                    onSearch={onSearch}
                    style={styles.formElement}
                />
                <Button
                    title="Create"
                    style={styles.formElement}
                />
            </View>
        </ScreenContainer>
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

export default ChatCreateScreen;
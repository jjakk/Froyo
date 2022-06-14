import React, { useState } from "react";
// Components
import { View, StyleSheet } from "react-native";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { SearchBar } from "@froyo/bars";
import { UserList } from "@froyo/lists";
import { TextInput, Button } from "@froyo/elements";
// Context
import { useUser } from "@froyo/user-context";

const ChatCreateScreen = () => {
    // Context
    const { getUser, searchUser } = useUser();

    // State
    const [members, setMembers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);


    const onSearch = async (query) => {
        try {
            setLoading(true);
            setSearchResults(
                !query
                    ? []
                    : await searchUser({ text: query })
            );
        }
        catch(err) {
            Alert.alert(err.response.data);
        }
        finally {
            setLoading(false);
        }
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
                <UserList
                    users={searchResults}
                    loading={loading}
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
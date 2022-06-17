import React, { useState } from "react";
// Components
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "@froyo/elements";
import { SearchBar } from "@froyo/bars";
import { UserList } from "@froyo/lists";
// Context
import { useUser } from "@froyo/user-context";

const UserSelect = () => {
    const { searchUser } = useUser();

    const [searchResults, setSearchResults] = useState([]);
    const [members, setMembers] = useState([]);
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
        <View>
            <SearchBar
                placeholder="Members"
                onSearch={onSearch}
                style={styles.element}
            />

            <UserList
                users={searchResults}
                loading={loading}
                style={[
                    styles.element,
                    styles.userList
                ]}
                selectable
            />
            <Text style={[
                styles.element,
                styles.membersHeader
            ]}>
                Members
            </Text>
            <UserList
                users={members}
                style={[
                    styles.element,
                    styles.userList
                ]}
                selectable
            />
        </View>
    );
};

const styles = StyleSheet.create({
    element: {
        marginBottom: 25
    },
    membersHeader: {
        fontSize: 22,
        textDecorationLine: "underline"
    },
    userList: {
        maxHeight: 150
    }
});

export default UserSelect;
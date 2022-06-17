import React, { useState } from "react";
// Components
import { View, StyleSheet } from "react-native";
import { SearchBar } from "@froyo/bars";
import { UserList } from "@froyo/lists";
// Context
import { useUser } from "@froyo/user-context";

const UserSelect = () => {
    const { searchUser } = useUser();

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

    console.log(searchResults);

    return (
        <View>
            <SearchBar
                placeholder="Members"
                onSearch={onSearch}
                style={styles.searchBar}
            />
            <UserList
                users={searchResults}
                loading={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 25
    }
});

export default UserSelect;
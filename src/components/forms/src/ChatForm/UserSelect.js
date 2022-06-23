import React, { useEffect, useState } from "react";
// Components
import {
    View,
    StyleSheet,
    Alert
} from "react-native";
import { Text, Button, Overlay } from "@froyo/elements";
import { SearchBar } from "@froyo/bars";
import { UserList } from "@froyo/lists";
// Context
import { useUser } from "@froyo/user-context";

const UserSelect = (props) => {
    const { searchUser, getUser } = useUser();

    const {
        onChange,
    } = props;

    const [showSelection, setShowSelection] = useState(false);
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

    const onToggleUser = (userId) => {
        if(members.includes(userId)){
            setMembers(members.filter(user => user.id !== userId));
        }
        else {
            getUser(userId).then(user => {
                setMembers([...members, user]);
            });
        }
    };

    const toggleShowSelection = () => {
        setShowSelection(!showSelection);
        setSearchResults([]);
    };

    useEffect(() => {
        onChange(members);
    }, [members]);

    return (
        <View>
            <Overlay
                overlayStyle={styles.overlay}
                isVisible={showSelection}
            >
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
                    selectedUsers={members}
                    onToggleUser={onToggleUser}
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
                    selectedUsers={members}
                    onToggleUser={onToggleUser}
                />
                <Button
                    title="Set members"
                    style={styles.element}
                    onPress={toggleShowSelection}
                />
            </Overlay>
            <Button
                title="Add Members"
                style={styles.element}
                onPress={toggleShowSelection}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        padding: 25,
        borderRadius: 15,
        width: "90%"
    },
    element: {
        marginBottom: 25
    },
    membersHeader: {
        fontSize: 22,
        textDecorationLine: "underline"
    },
    userList: {
        height: 200
    }
});

export default UserSelect;
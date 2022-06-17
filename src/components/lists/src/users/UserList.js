import React from "react";
// Components
import {
    StyleSheet,
    View
} from "react-native";
import { FlatList } from "@froyo/elements";
import UserPreview from "./UserPreview";

const UserList = (props) => {

    // Props
    const {
        users,
        style,
        loading
    } = props;

    return (
        <View
            style={[
                styles.container,
                style
            ]}
        >
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <UserPreview user={item} />
                )}
                emptyMessage="No users found"
                loading={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
});

export default UserList;
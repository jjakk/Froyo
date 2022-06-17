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
        loading,
        selectable
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
                    <UserPreview user={item} selectable={selectable} />
                )}
                emptyMessage="No users found"
                loading={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    }
});

export default UserList;
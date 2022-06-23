import React from "react";
import { StyleSheet } from "react-native";
import { UserList } from "@froyo/lists";

const FollowersScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    const { followers } = navigation.getParam("connections");

    return (
        <UserList
            users={followers}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default FollowersScreen;
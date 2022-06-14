import React from "react";
import { UserList } from "@froyo/lists";

const FollowingScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    const { following } = navigation.getParam("connections");

    return (
        <UserList
            users={following}
        />
    );
};

export default FollowingScreen;
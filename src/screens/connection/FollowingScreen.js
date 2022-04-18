import React from "react";
import UserList from "../../components/users/UserList";

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
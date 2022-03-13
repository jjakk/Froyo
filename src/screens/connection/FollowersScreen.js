import React from 'react';
import UserList from '../../components/users/UserList';

const FollowersScreen = (props) => {
    // Props
    const {
        navigation
    } = props;

    const { followers } = navigation.getParam('connections');

    return (
        <UserList
            users={followers}
        />
    );
};

export default FollowersScreen;
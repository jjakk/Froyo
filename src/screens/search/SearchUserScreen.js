import React from 'react';
// Components
import UserList from '../../components/users/UserList';

const SearchUserScreen = (props) => {
    const dummyUsers = [
        {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
        }
    ];

    return (
        <UserList
            users={[]}
        />
    );
};

export default SearchUserScreen;
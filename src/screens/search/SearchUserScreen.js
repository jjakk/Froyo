import React, { useState, useEffect } from 'react';
// Components
import UserList from '../../components/users/UserList';
// Context
import { useUser } from '../../context/UserContext';
// Navigation
import { NavigationEvents } from 'react-navigation';

const SearchUserScreen = (props) => {
    // Context
    const { searchUser } = useUser();

    // Props
    const {
        navigation
    } = props;

    // State
    const [results, setResults] = useState([]);

    // Navigation params
    const query = navigation.getParam('searchQuery');

    const refreshUsers = async () => {
        if (query) {
            try {
                setResults(await searchUser({ text: query }));
            }
            catch(err) {
                Alert.alert(err.response.data);
            }
        }
        else {
            setResults([]);
        }
    };

    useEffect(() => {
        (async function(){
            await refreshUsers();
        })()
    }, [query]);

    return (
        <>
            <NavigationEvents
                onDidFocus={refreshUsers}
            />
            <UserList
                users={results}
            />
        </>
    );
};

export default SearchUserScreen;
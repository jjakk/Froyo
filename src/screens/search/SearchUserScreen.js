import React, { useState, useEffect } from 'react';
// Components
import UserList from '../../components/users/UserList';
// Context
import { useUser } from '../../context/UserContext';

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
    const query = navigation.getParam('query');

    useEffect(() => {
        (async function(){
            if(query) {
                try {
                    setResults(await searchUser({ text: query }));
                }
                catch(err) {
                    Alert.alert(err.response.data);
                }
            }
        })()
    }, [query]);

    return (
        <UserList
            users={results}
        />
    );
};

export default SearchUserScreen;
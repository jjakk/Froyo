import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
// Components
import PostList from '../../components/content/PostList';
// Context
import { useContent } from '../../context/ContentContext';
// Navigation
import { NavigationEvents } from 'react-navigation';

const SearchPostScreen = (props) => {
    // Context
    const { searchContent } = useContent();

    // Props
    const {
        navigation
    } = props;

    // State
    const [results, setResults] = useState([]);

    // Navigation params
    const query = navigation.getParam('searchQuery');

    const refreshPosts = async () => {
        try {
            if (query) {
                setResults(await searchContent('post', { text: query }));
            }
            else {
                setResults([]);
            }
        }
        catch(err) {
            Alert.alert(err.response.data);
        }
    };

    useEffect(() => {
        (async function(){
            await refreshPosts();
        })()
    }, [query]);

    return (
        <>
            <NavigationEvents
                onDidFocus={refreshPosts}
            />
            <PostList
                type='Search'
                emptyMessage='No posts found'
                refreshable={false}
                data={results}
                onDelete={refreshPosts}
            />
        </>
    );
};

export default SearchPostScreen;
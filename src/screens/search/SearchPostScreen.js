import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
// Components
import PostList from '../../components/content/PostList';
// Context
import { useContent } from '../../context/ContentContext';

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
    const query = navigation.getParam('query');

    useEffect(() => {
        (async function(){
            try {
                setResults(await searchContent('post', { text: query }));
            }
            catch(err) {
                Alert.alert(err.response.data);
            }
        })()
    }, [query]);

    return (
        <PostList
            type='Search'
            emptyMessage='No posts found'
            refreshable={false}
            data={results}
            //onDelete={onSearch}
            //ref={postListRef}
        />
    );
};

export default SearchPostScreen;
import React, { useState, useContext } from 'react';
import {
    StyleSheet
} from 'react-native';
// Components
import ScreenContainer from '../components/ScreenContainer';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import PostList from '../components/content/PostList';
// Context
import { Context as PostContext } from '../context/PostContext';

const SearchScreen = () => {
    const { searchPosts } = useContext(PostContext);
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSearch = async (searchValue=searchText) => {
        setLoading(true);
        setPosts(await searchPosts({ text: searchValue }));
        setLoading(false);
    };

    // Error handling
    const clearError = () => {
        setError('');
    };

    return (
        <ScreenContainer
            edges={['top']}
        >
            <SearchBar
                onSearch={onSearch}
                setSearchText={setSearchText}
            />
            <PostList
                posts={posts}
                loading={loading}
                emptyMessage='No posts found'
                onPostDelete={onSearch}
                onError={setError}
                style={styles.postList}
            />
            <ErrorMessage
                type='box'
                message={error}
                clearError={clearError}
                style={styles.error}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    error: {
        position: 'absolute',
        bottom: 0,
        margin: 25
    }
});

export default SearchScreen;
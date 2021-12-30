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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSearch = async (query='') => {
        setLoading(true);
        await searchPosts(query, (posts, err) => {
            setLoading(false);
            if(err) {
                setError(err);
            }
            else{
                setPosts(posts);
            }
        });
    };

    // Error handling
    const onError = (err) => {
        setError(err);
    }
    const clearError = () => {
        setError('');
    };

    return (
        <ScreenContainer
            edges={['top']}
        >
            <SearchBar onSearch={onSearch} />
            <PostList
                posts={posts}
                loading={loading}
                emptyMessage='No posts found'
                emptyMessageAlign='flex-start'
                onPostDelete={onSearch}
                onError={onError}
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
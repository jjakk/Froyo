import React, { useState, useRef } from 'react';
// Components
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/SearchBar';
import PostList from '../components/content/PostList';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const postListRef = useRef();

    const onSearch = async () => {
        await postListRef.current.search(searchText);
    };
    
    const onClear = async () => {
        await postListRef.current.search('');
    };

    // Event handlers
    const onDidFocus = async () => {
        await onSearch();
    };

    return (
        <ScreenContainer
            edges={['top']}
            onDidFocus={onDidFocus}
        >
            <PostList
                type='Search'
                emptyMessage='No posts found'
                refreshable={false}
                HeaderComponent={(
                    <SearchBar
                        onSearch={onSearch}
                        onClear={onClear}
                        setSearchText={setSearchText}
                    />
                )}
                ref={postListRef}
            />
        </ScreenContainer>
    );
};

export default SearchScreen;
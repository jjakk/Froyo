import React, { useState, useContext, useRef } from 'react';
// Components
import { NavigationEvents } from 'react-navigation';
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/SearchBar';
import PostList from '../components/content/PostList';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const postListRef = useRef();

    const onSearch = async (searchValue=searchText) => {
        postListRef.current.search(searchValue);
    };

    // Event handlers
    const onDidFocus = async () => {
        await onSearch();
    };

    return (
        <ScreenContainer
            edges={['top']}
        >
            <NavigationEvents onDidFocus={onDidFocus}/>
            <PostList
                type='Search'
                emptyMessage='No posts found'
                HeaderComponent={(
                    <SearchBar
                        onSearch={onSearch}
                        setSearchText={setSearchText}
                    />
                )}
                ref={postListRef}
            />
        </ScreenContainer>
    );
};

export default SearchScreen;
import React, { useState, useContext, useRef } from 'react';
// Components
import { NavigationEvents } from 'react-navigation';
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/SearchBar';
import PostList from '../components/content/PostList';
// Context
import { Context as PostContext } from '../context/PostContext';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const searchRef = useRef();

    const onSearch = async (searchValue=searchText) => {
        searchRef.current.search(searchValue);
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
                ref={searchRef}
            />
        </ScreenContainer>
    );
};

export default SearchScreen;
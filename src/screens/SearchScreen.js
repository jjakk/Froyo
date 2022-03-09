import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
// Components
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/bars/SearchBar';
import PostList from '../components/content/PostList';
// Context
import { useSettings } from '../context/SettingsContext';
// Constants
import { colors } from '../constants/constants';

const SearchScreen = () => {
    // Context
    const { state: { theme } } = useSettings();

    // State
    const [searchText, setSearchText] = useState('');
    const postListRef = useRef();

    const onSearch = async () => {
        await postListRef.current.reloadContent(searchText);
    };
    
    const onClear = async () => {
        await postListRef.current.reloadContent('');
    };

    return (
        <ScreenContainer
            onDidFocus={onSearch}
            style={themeStyles[theme].container}
        >
            <PostList
                type='Search'
                emptyMessage='No posts found'
                refreshable={false}
                onDelete={onSearch}
                ListHeaderComponent={(
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

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default SearchScreen;
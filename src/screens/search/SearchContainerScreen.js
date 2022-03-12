import React, { useState, useRef } from 'react';
import { StyleSheet, Appearance } from 'react-native';
// Components
import { MaterialTopTabBar } from 'react-navigation-tabs';
import ScreenContainer from '../../components/ScreenContainer';
import SearchBar from '../../components/bars/SearchBar';
// Constants
import { colors } from '../../constants/constants';

const SearchContainerScreen = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // State
    const [searchText, setSearchText] = useState('');

    // Refs
    /*const postListRef = useRef();

    const onSearch = async () => {
        await postListRef.current.reloadContent(searchText);
    };
    
    const onClear = async () => {
        await postListRef.current.reloadContent('');
    };*/

    return (
        <ScreenContainer
            //onDidFocus={onSearch}
            style={[
                styles.container,
                themeStyles[theme].container
            ]}
        >
            <SearchBar
                //onSearch={onSearch}
                //onClear={onClear}
                //setSearchText={setSearchText}
            />
            <MaterialTopTabBar {...props} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0
    },
});

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

export default SearchContainerScreen;
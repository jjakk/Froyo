import React, { useContext } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {

    return (
        <ScreenContainer>
            <SearchBar onSearch={() => {}} />
            <View style={styles.results}></View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    
});

export default SearchScreen;
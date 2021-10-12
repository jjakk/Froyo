import React, { useContext } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PostContext } from '../context/PostContext';
import { Context as AuthContext } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {
    const { searchPosts, state: { posts } } = useContext(PostContext);
    const { searchUsers, state: { users } } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <View style={styles.container}>
                    <SearchBar onSearch={() => {}} />
                    <View style={styles.results}></View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    results: {

    }
});

export default SearchScreen;
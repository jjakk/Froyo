import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <View style={styles.container}>
                    <SearchBar onSearch={() => {}} />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SearchScreen;
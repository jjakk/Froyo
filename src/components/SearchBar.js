import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from './froyo-elements';
import Search from '../../assets/icons/Search.svg';

const SearchBar = ({ onSearch }) => {
  return (
    <View>
        <Input
            style={styles.container}
            textStyle={styles.text}
            placeholder='Search'
            icon={(
                <Search color='black' width={25} height={25} />
            )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 50,
        margin: 25
    },
    text: {
        
    }
});

export default SearchBar;


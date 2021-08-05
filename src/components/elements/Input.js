import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = (props) => {
    const { style, textStyle } = props;

    return (
        <View style={[styles.container, style]}>
            <TextInput {...props} style={[styles.text, textStyle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#404040'
    },
    text: {
        fontFamily: 'Nunito',
        fontSize: 20
    }
});

export default Input;




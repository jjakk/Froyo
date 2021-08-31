import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './froyo-elements';

const EmptyMessage = ({ style, subheaderText }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.text, styles.header]}>Nothing to show</Text>
            <Text style={[styles.text, styles.emoticon]}>¯\_(ツ)_/¯</Text>
            <Text style={[styles.text, styles.subheader]}>{subheaderText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center'
    },
    header: {
        fontSize: 24
    },
    emoticon: {
        fontSize: 32,
        margin: 10
    },
    subheader: {
        fontSize: 18
    }
});

export default EmptyMessage;
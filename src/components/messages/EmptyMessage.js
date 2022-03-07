import React from 'react';
// Components
import { View, StyleSheet } from 'react-native';
import { Text } from '../froyo-elements';

const EmptyMessage = ({ style, subheaderText }) => {

    return (
        <View style={[styles.container, style]}>
            <Text style={[
                styles.text,
                styles.header
            ]}>Nothing to show</Text>
            <Text style={[
                styles.text,
                styles.subheader
            ]}>{subheaderText}</Text>
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
        fontSize: 26,
        marginBottom: 10
    },
    subheader: {
        opacity: 0.7,
        fontSize: 18,
        lineHeight: 36
    }
});

export default EmptyMessage;
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/froyo-elements';

const Comment = (props) => {
    
    const {
        style
    } = props;

    return (
        <View style={[styles.comment, style]}></View>
    );
}

const styles = StyleSheet.create({
    comment: {
        backgroundColor: 'white',
        marginBottom: 5
    },
});

export default Comment
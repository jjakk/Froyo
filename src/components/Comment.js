import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/froyo-elements';

const Comment = (props) => {
    
    const {
        style,
        text
    } = props;

    return (
        <View style={[styles.comment, style]}>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        backgroundColor: 'white',
        marginBottom: 5
    },
});

export default Comment
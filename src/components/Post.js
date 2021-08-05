import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './froyo-elements';

const Post = ({ author, age, text }) => {
    return (
        <View style={styles.post}>
            <Text>{author}</Text>
            <Text>{age}</Text>
            <Text>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white'
    }
});

export default Post;
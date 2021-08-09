import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './froyo-elements';
import { Image } from 'react-native';

const Post = ({ author, age, text }) => {
    return (
        <View style={styles.post}>
            <Text>
                <Image source={require('../../assets/icons/guest.png')}/>
                <Text>{author}</Text>
                <Text>{age}</Text>
            </Text>
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
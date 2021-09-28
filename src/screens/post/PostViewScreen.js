import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '../../components/froyo-elements';
import Post from '../../components/Post';

const PostViewScreen = ({ navigation }) => {
    const post = navigation.getParam('post');

    return (
        <SafeAreaView style={styles.container}>
            <Post
                author={'[Author name]'}
                text={post.body}
                uploadDate={post.timestamp}
                style={styles.post }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    post: {
        marginTop: 50
    }
});

export default PostViewScreen;

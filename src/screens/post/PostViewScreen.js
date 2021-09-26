import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '../../components/froyo-elements';
import Post from '../../components/Post';

const PostViewScreen = ({ navigation }) => {
    const post = navigation.getParam('post');

    return (
        <SafeAreaView>
            <Post
                author={'[Author name]'}
                text={post.body}
                uploadDate={post.timestamp}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default PostViewScreen;

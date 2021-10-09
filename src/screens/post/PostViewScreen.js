import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text } from '../../components/froyo-elements';
import { Context as PostContext } from '../../context/PostContext';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const { getPost, state: { post } } = useContext(PostContext);
    const id = navigation.getParam('id');

    useEffect(() => {
        (async function(){
            await getPost(id);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.postView}>
                <Post
                    author={post.authorName || 'loading'}
                    text={post.body || 'loading'}
                    uploadDate={post.timestamp || Date()}
                    style={styles.post || 'loading'}
                />
                {/*<Comment/>*/}
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                <BackIcon width={25} height={25} style={styles.back} />
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    back: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 20,
        left: 20
    },
    postView: {
        marginTop: 60,
        backgroundColor: '#F2F2F2'
    },
    post: {
        marginTop: 5
    }
});

export default PostViewScreen;

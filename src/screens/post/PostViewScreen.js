import React from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text } from '../../components/froyo-elements';
import Post from '../../components/Post';
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const post = navigation.getParam('post');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.post}>
                <Post
                    author={'[Author name]'}
                    text={post.body}
                    uploadDate={post.timestamp}
                />
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
    post: {
        marginTop: 50,
        backgroundColor: '#F2F2F2'
    }
});

export default PostViewScreen;

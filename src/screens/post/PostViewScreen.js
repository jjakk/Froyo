import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text } from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const { getPost } = useContext(AuthContext);
    const id = navigation.getParam('id');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.postView}>
                <Post
                    /*author={'[Author name]'}
                    text={post.body}
                    uploadDate={post.timestamp}
                    style={styles.post}*/
                />
                <Text>{getPost(id).toString()}</Text>
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

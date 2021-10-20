import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthContext';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const { getUserInfo, state: { user } } = useContext(AuthContext);
    const { getPost, state: { post } } = useContext(PostContext);
    const id = navigation.getParam('id');

    useEffect(() => {
        (async function(){
            await getUserInfo();
            await getPost(id);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.postView}>
                <Post
                    id={id}
                    personalPost={post.author === user._id}
                    clickable={false}
                />
                {/*Comments*/}
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
        top: 60,
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

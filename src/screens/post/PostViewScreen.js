import React, { useContext, useEffect } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthContext';
// Components
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import CommentBar from '../../components/CommentBar';
// Icons
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

    const onBack = async () => {
        navigation.pop();
    };

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
            <CommentBar style={styles.commentBar}/>
            <TouchableWithoutFeedback onPress={onBack}>
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
    },
    commentBar: {
        position: 'absolute',
        bottom: 0
    }
});

export default PostViewScreen;

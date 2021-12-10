import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    View,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { Context as PostContext } from '../../context/PostContext';
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import { Text } from '../../components/froyo-elements';
import CommentBar from '../../components/CommentBar';
import Post from '../../components/content/Post';
import Comment from '../../components/content/Comment';
import ErrorMessage from '../../components/ErrorMessage';
// Icons
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const { clearErrorMessage: postClear, getPost, state: {  errorMessage: postError } } = useContext(PostContext);
    const { clearErrorMessage: commentClear, getComments, state: { errorMessage: commentError } } = useContext(CommentContext);
    const [post, setPost] = useState(navigation.getParam('post'));
    const [comments, setComments] = useState(null);

    // Update comments when post is refreshed
    useEffect(() => {
        (async function(){
            setComments(await getComments(post));
        })();
    }, [post]);

    const onBack = async () => {
        navigation.pop();
    };

    // When the user closes an error message
    const onErrorClose = () => {
        postClear();
        commentClear();
    }

    // Refresh post information (get new comment)
    const refreshPost = async () => {
        setPost(await getPost(post.id));
    };

    return (
        <SafeAreaView
            style={styles.container}
        >
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
                    style={styles.container}
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={onBack}>
                                <BackIcon width={25} height={25} style={styles.back} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.contentView}>
                            <Post
                                data={post}
                                clickable={false}
                            />
                            {
                                comments ? (
                                    comments.length > 0 ? (
                                        comments.map(comment => (
                                            <Comment
                                                key={comment.id}
                                                data={comment}
                                                onDelete={refreshPost}
                                            />
                                        ))
                                    ) : (
                                        <Text style={styles.noComments}>No comments</Text>
                                    )
                                ) : (
                                    <Text style={styles.noComments}>Loading</Text>
                                )
                                
                            }
                        </ScrollView>
                        <CommentBar
                            parent_id={post.id}
                            onCreateComment={refreshPost}
                        />
                        <ErrorMessage
                            type='box'
                            message={postError || commentError}
                            onClose={onErrorClose}
                            style={styles.error}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 2
    },
    back: {
        margin: 20
    },
    post: {
        marginTop: 5
    },
    contentView: {
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
    },
    error: {
        position: 'absolute',
        bottom: 125
    }
});

export default PostViewScreen;

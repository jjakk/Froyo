import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    View,
    Platform,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { Context as PostContext } from '../../context/PostContext';
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import CommentBar from '../../components/CommentBar';
import Post from '../../components/content/Post';
import CommentList from '../../components/content/CommentList';
import ErrorMessage from '../../components/ErrorMessage';
// Icons
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const {
        clearErrorMessage: postClear,
        getPost,
        state: {
            errorMessage: postError
        }
    } = useContext(PostContext);
    const {
        clearErrorMessage: commentClear,
        getComments,
        state: {
            errorMessage: commentError
        }
    } = useContext(CommentContext);
    const [post, setPost] = useState(navigation.getParam('post'));
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);

    // Update comments when post is refreshed
    useEffect(() => {
        (async function(){
            setLoadingComments(true);
            setComments(await getComments(post));
            setLoadingComments(false);
        })();
    }, [post]);

    // Refresh post information (get new comment)
    const refreshPost = async () => {
        setPost(await getPost(post.id));
    };

    // Event Handlers
    // When the user closes an error message
    const onErrorClose = () => {
        postClear();
        commentClear();
    };
    // When the user deletes the posts being viewed
    const onDeletePost = () => {
        navigation.pop();
    };
    // When the back button's pressed
    const onBack = async () => {
        navigation.pop();
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
                        <ScrollView
                            style={styles.contentView}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={refreshPost}
                                />
                            }
                        >
                            <Post
                                data={post}
                                clickable={false}
                                onDelete={onDeletePost}
                            />
                            <CommentList
                                comments={comments}
                                loading={loadingComments}
                                onDeleteComment={refreshPost}
                            />
                        </ScrollView>
                        <CommentBar
                            parent_id={post.id}
                            onCreateComment={refreshPost}
                        />
                        <ErrorMessage
                            type='box'
                            message={postError || commentError}
                            clearFunctions={[postClear, commentClear]}
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
    error: {
        position: 'absolute',
        bottom: 125
    }
});

export default PostViewScreen;

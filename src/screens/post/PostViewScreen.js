import React, { useContext, useEffect, useState } from 'react';
// Components
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    View,
    Platform,
    RefreshControl
} from 'react-native';
import { TouchableIcon } from '../../components/froyo-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommentBar from '../../components/CommentBar';
import Post from '../../components/content/Post';
import CommentList from '../../components/content/CommentList';
import ErrorMessage from '../../components/ErrorMessage';
// Context
import { Context as PostContext } from '../../context/PostContext';
import { Context as CommentContext } from '../../context/CommentContext';
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
    // Boolean to control whether content is refreshing
    const [refreshing, setRefreshing] = useState(false);

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
    // When leaving the post view screen
    const onBack = async () => {
        navigation.pop();
    };
    // Handle refresh pull down
    const onRefresh = async () => {
        setRefreshing(true);
        await refreshPost(true);
        setRefreshing(false);
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
                            <TouchableIcon
                                Icon={BackIcon}
                                size={25}
                                style={styles.back}
                                onPress={onBack}
                            />
                        </View>
                        <ScrollView
                            style={styles.contentView}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <Post
                                data={post}
                                clickable={false}
                                onDelete={onBack}
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

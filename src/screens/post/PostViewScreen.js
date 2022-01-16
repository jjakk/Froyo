import React, { useContext, useEffect, useState } from 'react';
// Components
import {
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import CommentBar from '../../components/CommentBar';
import Post from '../../components/content/Post';
import CommentList from '../../components/content/CommentList';
// Constants
import { colors } from '../../constants/constants';
// Context
import { Context as PostContext } from '../../context/PostContext';
import { Context as CommentContext } from '../../context/CommentContext';

const PostViewScreen = ({ navigation }) => {
    const { getPost } = useContext(PostContext);
    const { getComments } = useContext(CommentContext);
    // Content
    const [post, setPost] = useState(navigation.getParam('post'));
    const [comments, setComments] = useState([]);
    // Status state
    const [loadingComments, setLoadingComments] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Update comments when post is refreshed
    useEffect(() => {
        (async function(){
            setLoadingComments(true);
            setComments(await getComments(post.id));
            setLoadingComments(false);
        })();
    }, [post]);

    // Refresh post information (get new comment)
    const refreshPost = async (err) => {
        if (err) setError(err);
        else{
            setPost(await getPost(post.id));
        }
    };

    // Event Handlers
    const onRefresh = async () => {
        setRefreshing(true);
        await refreshPost();
        setRefreshing(false);
    };

    return (
        <ScreenContainer style={styles.container}>
                <Header navigation={navigation} />
                <ScrollView
                    contentContainerStyle={styles.contentView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Post
                        post={post}
                        clickable={false}
                        onDelete={navigation.pop}
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
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
    post: {
        marginTop: 5
    },
    contentView: {
        backgroundColor: colors.LIGHT_GREY,
        flex: 1,
        justifyContent: 'flex-start',
    }
});

export default PostViewScreen;

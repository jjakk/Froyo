import React, { useEffect, useState } from 'react';
// Components
import {
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import CommentBar from '../../components/bars/CommentBar';
import Post from '../../components/content/Post';
import CommentList from '../../components/content/CommentList';
// Constants
import { colors } from '../../constants/constants';
// Context
import { useContent } from '../../context/ContentContext';
import { useSettings } from '../../context/SettingsContext';

const PostViewScreen = ({ navigation }) => {
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark';
    const { getContent, getComments } = useContent();
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
            setComments(await getComments('post', post.id));
            setLoadingComments(false);
        })();
    }, [post]);

    // Refresh post information (get new comment)
    const refreshPost = async (err) => {
        if (err) setError(err);
        else{
            setPost(await getContent('post', post.id));
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
                <Header
                    navigation={navigation}
                />
                <ScrollView
                    contentContainerStyle={styles.contentView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={darkModeEnabled ? colors.GREY : colors.DARK_GREY}
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
    post: {
        marginTop: 5
    },
    contentView: {
        flex: 1,
        justifyContent: 'flex-start',
    }
});

export default PostViewScreen;

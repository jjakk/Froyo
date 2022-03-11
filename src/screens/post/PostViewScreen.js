import React, { useState } from 'react';
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
// Context
import { useContent } from '../../context/ContentContext';

const PostViewScreen = ({ navigation }) => {
    const { getContent } = useContent();
    // Content
    const [post, setPost] = useState(navigation.getParam('post'));

    // Refresh post information (get new comments)
    const refreshPost = async () => {
        setPost(await getContent('post', post.id));
    };

    return (
        <ScreenContainer
            style={styles.container}
            edges={['top', 'bottom']}
        >
                <Header
                    navigation={navigation}
                />
                <CommentList
                    parent={post}
                    onDeleteComment={refreshPost}
                    onPullDownRefresh={refreshPost}
                    ListHeaderComponent={(
                        <Post
                            data={post}
                            style={styles.post}
                            onDelete={navigation.pop}
                        />
                    )}
                />
                <CommentBar
                    parent_id={post.id}
                    onCreateComment={refreshPost}
                />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    post: {
        marginBottom: 0
    }
});

export default PostViewScreen;

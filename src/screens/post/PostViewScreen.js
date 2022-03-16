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
// Context
import { useContent } from '../../context/ContentContext';

const PostViewScreen = ({ navigation }) => {
    const { getContent } = useContent();
    // Content
    const passedPost = navigation.getParam('post');
    const [post, setPost] = useState(passedPost);

    // Refresh post information (get new comments)
    const refreshPost = async () => {
        setPost(await getContent('post', passedPost.id));
    };

    useEffect(() => {
        (async function(){
            await refreshPost();
        })();
    }, [passedPost]);

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
                    style={styles.commentList}
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
    },
    commentList: {
        marginBottom: 5
    }
});

export default PostViewScreen;

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
    const [loading, setLoading] = useState(false);

    // Refresh post information (get new comments)
    const retreivePost = async () => {
        try {
            setLoading(true);
            setPost(await getContent('post', passedPost.id));
        }
        catch(err) {
            Alert.alert(err.response.data);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPost(passedPost);
    }, [passedPost]);

    return (
        <ScreenContainer
            style={styles.container}
            edges={['top', 'bottom']}
        >
                <Header/>
                <CommentList
                    parent={post}
                    loading={loading}
                    onRefresh={retreivePost}
                    style={styles.commentList}
                    ListHeaderComponent={(
                        <Post
                            data={post}
                            loading={loading}
                            style={styles.post}
                            onDelete={navigation.pop}
                            commentsButtonDisabled
                        />
                    )}
                />
                <CommentBar
                    parent_id={post.id}
                    onCreateComment={retreivePost}
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

import React, { useEffect, useState } from "react";
// Components
import {
    Alert,
    StyleSheet
} from "react-native";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { CommentBar } from "@froyo/bars";
import Post from "../../components/lists/src/content/Post";
import { CommentList } from "@froyo/lists";
// Context
import { useContent } from "@froyo/content-context";

const PostViewScreen = ({ navigation }) => {
    const { getContent, createContent } = useContent();
    // Content
    const passedPost = navigation.getParam("post");
    const [post, setPost] = useState(passedPost);
    const [loading, setLoading] = useState(false);

    // Refresh post information and get new comments
    const retreivePost = async () => {
        try {
            setLoading(true);
            setPost(await getContent("post", passedPost.id));
        }
        catch(err) {
            Alert.alert(err.response.data);
        }
        finally {
            setLoading(false);
        }
    };

    // Handle posting a comment
    const onCreateComment = async (text) => {
        try {
            if(text){
                const content = {
                    text,
                    parent_id: post.id
                };
                await createContent("comment", content);
                await retreivePost();
            }
        }
        catch (err) {
            Alert.alert(err.message);
        }
    };

    useEffect(() => {
        setPost(passedPost);
        setLoading(false);
    }, [passedPost]);

    return (
        <ScreenContainer
            edges={["top", "bottom"]}
            onDidFocus={retreivePost}
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
                    onSubmit={onCreateComment}
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

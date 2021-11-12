import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import { Text } from '../../components/froyo-elements';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import CommentBar from '../../components/CommentBar';
// Icons
import BackIcon from '../../../assets/icons/Back.svg';
import { Platform } from 'react-native';
import { FlatList } from 'react-native';

const PostViewScreen = ({ navigation }) => {
    const { getUserInfo, state: { user } } = useContext(AuthContext);
    const { getPost } = useContext(PostContext);
    const { getComments, state: { comments } } = useContext(CommentContext);
    const id = navigation.getParam('id');
    const [contentLoaded, setContentLoaded] = useState(false);
    const [post, setPost] = useState({});

    useEffect(() => {
        (async function(){
            // Get user info to determine if the user is the author of the post
            await getUserInfo();
            getPost(id, async (post) => {
                setPost(post);
                await getComments(post);
            });
            setContentLoaded(true);
        })();
    }, []);

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
                        <View style={styles.contentView}>
                            <Post
                                id={id}
                                personalPost={post.author === user._id}
                                clickable={false}
                            />
                            {
                                contentLoaded ? (
                                    comments.length > 0 ? (
                                        <FlatList
                                            data={comments}
                                            keyExtractor={(item) => item._id}
                                            renderItem={({ item }) => {
                                                return (
                                                    <Comment
                                                        text={item.body}
                                                    />
                                                );
                                            }}
                                        />
                                    ) : (
                                        <Text style={styles.noComments}>No comments</Text>
                                    )
                                ) : (
                                    <Text style={styles.noComments}>Loading...</Text>
                                )
                            }
                        </View>
                        <CommentBar
                            parentId={id}
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
    contentView: {
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    back: {
        margin: 20
    },
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
    },
    post: {
        marginTop: 5
    }
});

export default PostViewScreen;

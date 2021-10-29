import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthContext';
// Components
import { Text } from '../../components/froyo-elements';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import CommentBar from '../../components/CommentBar';
// Icons
import BackIcon from '../../../assets/icons/Back.svg';
import { Platform } from 'react-native';

const PostViewScreen = ({ navigation }) => {
    const { getUserInfo, state: { user } } = useContext(AuthContext);
    const { getPost, state: { post } } = useContext(PostContext);
    const id = navigation.getParam('id');
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        (async function(){
            await getUserInfo();
            await getPost(id);
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
                        <ScrollView style={styles.contentView}>
                            <Post
                                id={id}
                                personalPost={post.author === user._id}
                                clickable={false}
                            />
                            {
                                contentLoaded ? (
                                    post.comments.length > 0 ? (
                                        post.comments.map(comment => (
                                            <Comment

                                            />
                                        ))
                                    ) : (
                                        <Text style={styles.noComments}>No comments</Text>
                                    )
                                ) : (
                                    <Text>Loading...</Text>
                                )
                            }
                        </ScrollView>
                        <CommentBar style={styles.commentBar}/>
                        <TouchableWithoutFeedback onPress={onBack}>
                            <BackIcon width={25} height={25} style={styles.back} />
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    back: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    contentView: {
        marginTop: 60,
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
    },
    post: {
        marginTop: 5
    },
    commentBar: {
        position: 'absolute',
        bottom: 0
    }
});

export default PostViewScreen;

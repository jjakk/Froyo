import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    View,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Context
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import { Text } from '../../components/froyo-elements';
import CommentBar from '../../components/CommentBar';
import Post from '../../components/content/Post';
import Comment from '../../components/content/Comment';
// Icons
import BackIcon from '../../../assets/icons/Back.svg';

const PostViewScreen = ({ navigation }) => {
    const [post, setPost] = useState(navigation.getParam('post'));

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
                                data={post}
                                clickable={false}
                            />
                            <Text>Comments go here</Text>
                        </View>
                        <CommentBar
                            parentId={post._id}
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

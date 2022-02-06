import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
// Navigation
import { navigate } from '../../navigation/navigationRef';
// Components
import {
    Text,
    TouchableIcon,
    MultipleTouchable,
    ImageList
} from '../froyo-elements';
import {
    LikeButton,
    DislikeButton
} from './parts/likeness-buttons';
import ContentHeader from './parts/ContentHeader';
import LikenessBar from './parts/LikenessBar';
// Contexts
import { useSettings } from '../../context/SettingsContext';
import { useUser } from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Icons
import CommentIcon from '../../../assets/icons/Comment.svg';

// Constants
import {
    colors,
    sizes,
    BASE_URL
} from '../../constants/constants';

// Post props & their meanings
// ___________________________
// clickable -> boolean: whether clicking on the post should trigger onPress
// style -> object: style for the post
// data -> object: data for the post
// onDelete -> function: the function to call when the delete button is pressed
// onPress -> function: the function to call when the post is tapped on

const Post = (props) => {
    const { state: { theme } } = useSettings();
    const { state: { user } } = useUser();
    const { likeContent, dislikeContent } = useContent();
    
    const {
        style,
        data: passedPost,
        onDelete
    } = props;

    const [post, setPost] = useState(passedPost);

    // Event handlers
    const onHeaderPress = () => {
        navigate('AccountView', { user: post.author });
    };

    const onPress = () => {
        navigate('PostView', { post });
    };

    const onLike = async () => {
        setPost(await likeContent('post', post.id));
    };

    const onDislike = async () => {
        setPost(await dislikeContent('post', post.id));
    };

    return (
        <TouchableWithoutFeedback>
            <View style={[
                styles.post,
                themeStyles[theme].post,
                style
            ]}>
                <ContentHeader
                    content={post}
                    onPress={onHeaderPress}
                    onDelete={onDelete}
                />
                {
                    post.images && (
                        <MultipleTouchable
                            onDoubleTap={onLike}
                            onTripleTap={onDislike}
                        >
                            <Image
                                source={{
                                    uri: `${BASE_URL}/images/${post.images[0]}`
                                }}
                                style={styles.image}
                            />
                        </MultipleTouchable>
                    )
                }
                <View style={styles.body}>
                    <Text style={styles.text}>{post.text}</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.likenessContainer}>
                        <View style={styles.likeness}>
                            <LikeButton
                                onPress={onLike}
                                content={post}
                            />
                            <DislikeButton
                                onPress={onDislike}
                                content={post}
                                style={styles.dislike}
                            />
                        </View>
                        <LikenessBar
                            show={post.author.id === user.id}
                            like_count={post.like_count}
                            dislike_count={post.dislike_count}
                        />
                    </View>
                    <TouchableIcon
                        Icon={CommentIcon}
                        size={sizes.ACTION_ICON}
                        onPress={onPress}
                        style={styles.comment}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    post: {
        marginTop: 5,
    },
    // Post image
    image: {
        marginBottom: 15,
        height: Dimensions.get('window').width
    },
    // Post body
    body: {
        margin: 15,
        marginTop: 0
    },
    // Actions
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        alignItems: 'center'
    },
    likeness: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    dislike: {
        marginTop: 5,
        marginLeft: 5
    },
    comment: {
        marginLeft: 15,
        marginBottom: 15
    }
});

const themeStyles = {
    light: StyleSheet.create({
        post: {
            backgroundColor: colors.WHITE,
        }
    }),
    dark: StyleSheet.create({
        post: {
            backgroundColor: colors.dark.THIRD,
        }
    })
};

export default Post;
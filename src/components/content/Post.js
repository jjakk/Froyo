import React, {
    useState,
    useContext
} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
// Navigation
import { navigate } from '../../navigation/navigationRef';
// Components
import {
    Text,
    TouchableIcon
} from '../froyo-elements';
import ContentHeader from './parts/ContentHeader';
import LikenessBar from './parts/LikenessBar';
// Contexts
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthContext';
// Icons
import LikeIconFill from '../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../assets/icons/Dislike-Outline.svg';
import CommentIcon from '../../../assets/icons/Comment.svg';
import ShareIcon from '../../../assets/icons/Share.svg';

// Constants
import {
    colors,
    sizes
} from '../../constants/constants';

// Post props & their meanings
// ___________________________
// clickable -> boolean: whether clicking on the post should trigger onPress
// style -> object: style for the post
// data -> object: data for the post
// onDelete -> function: the function to call when the delete button is pressed
// onEdit -> function: the function to call when the edit button is pressed
// onPress -> function: the function to call when the post is tapped on

const Post = (props) => {
    const { likePost, dislikePost, getPost } = useContext(PostContext);
    const { state: { user } } = useContext(AuthContext);
    
    const {
        clickable,
        style,
        post,
        onUpdate,
        onDelete,
        onPress,
        onError
    } = props;

    const onHeaderPress = () => {
        navigate('AccountView', { user: post.author });
    };

    // Default function to call when a post is tapped on
    const defaultOnPress = () => {
        navigate('PostView', { post });
    };

    // Update post information from context
    const updatePost = () => {
        try {
            onUpdate();
        }
        catch (err) {
            onError(err);
        }
    };

    // When like button is pressed
    const handleLike = async () => {
        try {
            await likePost(post.id);
            await updatePost();
        }
        catch (err) {
            onError(err);
        }
    };

    // When dislike button is pressed
    const handleDislike = async () => {
        try {
            await dislikePost(post.id);
            await updatePost();
        }
        catch (err) {
            onError(err);
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={
                clickable
                    ? (onPress || defaultOnPress)
                    : null
            }
        >
            <View style={[styles.post, style]}>
                <ContentHeader
                    post={post}
                    onPress={onHeaderPress}
                    onError={onError}
                    onDelete={onDelete}
                />
                <View style={styles.body}>
                    <Text style={styles.text}>{post.text}</Text>
                </View>
                <View style={styles.actions}>
                    {/* Like & dislike buttons */}
                    <View style={styles.likenessContainer}>
                        <View style={styles.likeness}>
                            {/* Like Button */}
                            <TouchableIcon
                                size={sizes.ACTION_ICON}
                                onPress={handleLike}
                                Icon={
                                    post.liking
                                    ? LikeIconFill : LikeIconOutline
                                }
                                color={
                                    post.liking
                                    ? colors.FROYO_GREEN : colors.DARK_GREY
                                }
                            />
                            {/* Disike Button */}
                            <TouchableIcon
                                size={sizes.ACTION_ICON}
                                onPress={handleDislike}
                                style={styles.dislike}
                                Icon={
                                    post.disliking
                                    ? DislikeIconFill : DislikeIconOutline
                                }
                                color={
                                    post.disliking
                                    ? colors.DISLIKE_RED : colors.DARK_GREY
                                }
                            />
                        </View>
                        <LikenessBar
                            show={post.author.id === user.id}
                            like_count={post.like_count}
                            dislike_count={post.dislike_count}
                        />
                    </View>
                    {/* Comment icon */}
                    <CommentIcon
                        width={sizes.ACTION_ICON}
                        height={sizes.ACTION_ICON}
                        style={styles.comment}
                        color={colors.DARK_GREY}
                    />
                    {/* Share button */}
                    <TouchableIcon
                        Icon={ShareIcon}
                        size={sizes.ACTION_ICON}
                        color={colors.DARK_GREY}
                        style={styles.share}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        marginTop: 5,
    },
    // Post body
    body: {
        margin: 15,
        marginTop: 0
    },
    // Actions
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginRight: 50,
        marginBottom: 15
    },
    share: {
        marginRight: 15,
        marginBottom: 15
    }
});

export default Post;
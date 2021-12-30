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
import Header from './parts/Header';
// Contexts
import { Context as PostContext } from '../../context/PostContext';
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
    
    const {
        clickable,
        style,
        data,
        onDelete,
        onPress,
        onError
    } = props;

    const [post, setPost] = useState(data);

    const onHeaderPress = () => {
        navigate('AccountView', { user: post.author });
    };

    // Default function to call when a post is tapped on
    const defaultOnPress = () => {
        navigate('PostView', { post });
    };

    // Update post information from context
    const updatePost = async () => {
        await getPost(data.id, (post, err) => {
            if (!err) {
                setPost(post);
            }
        });
    };

    // When like button is pressed
    const handleLike = async () => {
        await likePost(post, async (err) => {
            if (!err) {
                await updatePost();
            }
        });
    };

    // When dislike button is pressed
    const handleDislike = async () => {
        await dislikePost(post, async (err) => {
            if (!err) {
                await updatePost();
            }
        });
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
                <Header
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
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        marginBottom: 5
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
        alignItems: 'center'
    },
    likeness: {
        flexDirection: 'row'
    },
    dislike: {
        marginTop: 5,
        marginLeft: 5
    },
    comment: {
        marginRight: 35
    }
});

export default Post;
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
import { Context as UserContext } from '../../context/UserContext';
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
// onPress -> function: the function to call when the post is tapped on

const Post = (props) => {
    const { likePost, dislikePost, getPost } = useContext(PostContext);
    const { state: { user } } = useContext(UserContext);
    
    const {
        clickable,
        style,
        post: passedPost,
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
        await likePost(post.id);
        await updatePost();
    };

    const onDislike = async () => {
        await dislikePost(post.id);
        await updatePost();
    };

    // Update post from the server
    const updatePost = async () => {
        setPost(await getPost(post.id));
    };

    return (
        <TouchableWithoutFeedback
            onPress={
                clickable
                    ? onPress
                    : null
            }
        >
            <View style={[styles.post, style]}>
                <ContentHeader
                    post={post}
                    onPress={onHeaderPress}
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
                                onPress={onLike}
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
                                onPress={onDislike}
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
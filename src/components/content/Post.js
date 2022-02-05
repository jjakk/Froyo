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
    TouchableIcon
} from '../froyo-elements';
import ContentHeader from './parts/ContentHeader';
import LikenessBar from './parts/LikenessBar';
// Contexts
import { useSettings } from '../../context/SettingsContext';
import { useUser } from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
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
        onDelete,
        clickable=true
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
        <TouchableWithoutFeedback
            onPress={
                clickable
                    ? onPress
                    : null
            }
        >
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
                        <Image
                            source={{
                                uri: `${BASE_URL}/images/${post.images[0]}`
                            }}
                            style={styles.image}
                        />
                    )
                }
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
                                    ? colors.GREEN : colors.light.THIRD
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
                                    ? colors.DISLIKE_RED : colors.light.THIRD
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
                        color={colors.light.THIRD}
                    />
                    {/* Share button */}
                    <TouchableIcon
                        Icon={ShareIcon}
                        size={sizes.ACTION_ICON}
                        color={colors.light.THIRD}
                        style={styles.share}
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
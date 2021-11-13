import React, {
    useState,
    useContext
} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Text,
    Br,
    TouchableIcon
} from '../froyo-elements';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { navigate } from '../../navigation/navigationRef';
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { calculateAge } from '../../helperFunctions/age';
// Icons
import MoreOptionsIcon from '../../../assets/icons/MoreSettings.svg';
import LikeIconFill from '../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../assets/icons/Dislike-Outline.svg';
import CommentIcon from '../../../assets/icons/Comment.svg';
import ShareIcon from '../../../assets/icons/Share.svg';
import TrashIcon from '../../../assets/icons/Trash.svg';
import PenIcon from '../../../assets/icons/Pen.svg';
import SaveIcon from '../../../assets/icons/Save.svg';

// Constants
import {
    colors,
    sizes
} from '../../constants/constants';

const ACTION_ICON_SIZE = 27.5;
const OPTION_ICON_SIZE = 20;

// Post props & their meanings
// ___________________________
// clickable -> boolean: whether clicking on the post should trigger onPress
// style -> object: style for the post
// data -> object: data for the post
// onDelete -> function: the function to call when the delete button is pressed
// onEdit -> function: the function to call when the edit button is pressed
// onPress -> function: the function to call when the post is tapped on

const Post = (props) => {
    const { state: { user } } = useContext(AuthContext);
    const { likePost, dislikePost, getPost } = useContext(PostContext);
    
    const {
        clickable,
        style,
        data,
        onDelete,
        onEdit,
        onPress
    } = props;

    const [post, setPost] = useState(data);

    // Default function to call when a post is tapped on
    const defaultOnPress = () => {
        navigate('PostView', { post });
    };

    // Default functions for edit button
    const defaultOnEdit = () => {
        navigate('PostEdit');
    };
    
    // Default function for delete button
    const defaultOnDelete = () => {};

    // More options menu items
    const moreOptions = [
        // Only show these options if it's your own post
        ...(post.author === user._id ? [
            {
                label: 'Delete',
                onSelect: onDelete || defaultOnDelete,
                style: styles.deleteButton,
                icon: (
                    <TrashIcon
                        width={OPTION_ICON_SIZE}
                        height={OPTION_ICON_SIZE}
                        color='#FB1C1C'
                    /> 
                )
            },
            {
                label: 'Edit',
                onSelect: onEdit || defaultOnEdit,
                style: null,
                icon: (
                    <PenIcon
                        width={OPTION_ICON_SIZE}
                        height={OPTION_ICON_SIZE}
                        color='black'
                    /> 
                )
            }
        ]: []),
        // The rest of the options
        {
            label: 'Save',
            onSelect: () => {},
            style: null,

            icon: (
                <SaveIcon
                    width={OPTION_ICON_SIZE}
                    height={OPTION_ICON_SIZE}
                    color='black'
                /> 
            )
        }
    ];

    // Update post information from context
    const updatePost = async () => {
        await getPost(post._id, updatedPost => {
            setPost(updatedPost);
        });
    };

    // When like button is pressed
    const handleLike = async () => {
        await likePost(post._id);
        await updatePost();
    };

    // When dislike button  is pressed
    const handleDislike = async () => {
        await dislikePost(post._id);
        await updatePost();
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
                <View style={styles.header}>
                    <Menu style={styles.options}>
                        <MenuTrigger>
                            <MoreOptionsIcon name='options-vertical' height={sizes.ACTION_ICON} width={sizes.ACTION_ICON} color='black' />
                        </MenuTrigger>
                        <MenuOptions style={styles.moreOptions}>
                            {
                                moreOptions.map(option => (
                                    <MenuOption key={option.label} onSelect={option.onSelect}>
                                        <View style={styles.optionView}>
                                            {option.icon}
                                            <Text style={[option.style, styles.optionText]}>{option.label}</Text>
                                        </View>
                                    </MenuOption>
                                ))
                            }
                        </MenuOptions>
                    </Menu>
                    <Image
                        style={styles.profilePicture}
                        source={require('../../../assets/icons/guest.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.headerText}>
                        <Text style={styles.author}>{post.authorName}</Text>
                        <Br/>
                        <Text style={styles.age}>{ calculateAge(post.timestamp) }</Text>
                    </Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.text}>{post.body}</Text>
                </View>
                <View style={styles.actions}>
                    {/* Like & dislike buttons */}
                    <View style={styles.likeness}>
                        {/* Like Button */}
                        <TouchableIcon
                            size={sizes.ACTION_ICON}
                            onPress={handleLike}
                            Icon={
                                post.likes.includes(user._id)
                                ? LikeIconFill : LikeIconOutline
                            }
                            color={
                                post.likes.includes(user._id)
                                ? colors.FROYO_GREEN : 'black'
                            }
                        />
                        {/* Disike Button */}
                        <TouchableIcon
                            size={sizes.ACTION_ICON}
                            onPress={handleDislike}
                            style={styles.dislike}
                            Icon={
                                post.dislikes.includes(user._id)
                                ? DislikeIconFill : DislikeIconOutline
                            }
                            color={
                                post.dislikes.includes(user._id)
                                ? colors.DISLIKE_RED : 'black'
                            }
                        />
                    </View>
                    {/* Comment icon */}
                    <TouchableIcon
                        Icon={CommentIcon}
                        size={sizes.ACTION_ICON}
                        style={styles.comment}
                    />
                    {/* Share button */}
                    <TouchableIcon
                        Icon={ShareIcon}
                        size={sizes.ACTION_ICON}
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
    // Header
    header: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    options: {
        position: 'absolute',
        right: 0,
        top: 0,
        opacity: 0.75
    },
    headerText: {
        marginLeft: 15
    },
    profilePicture: {
        width: 50,
        height: 50
    },
    author: {
        fontSize: 22
    },
    age: {
        fontSize: 14
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
    },
    deleteButton: {
        color: '#FB1C1C'
    },
    // More options menu
    moreOptions: {
        margin: 10
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 20,
        marginLeft: 10
    }
});

export default Post;
import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Context
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import {
    Text,
    TouchableIcon
} from '../../components/froyo-elements';
import Header from './parts/Header';
import MoreOptions from './parts/MoreOptions';
// Constants
import { colors, sizes } from '../../constants/constants';
// Icons
import ReplyIcon from '../../../assets/icons/Reply.svg';
import LikeIconFill from '../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../assets/icons/Dislike-Outline.svg';

const ACTION_SIZE = 25;
const ACTION_COLOR = 'black';

const Comment = (props) => {
    const { state: { user } } = useContext(AuthContext);
    const { getComment, likeComment, dislikeComment } = useContext(CommentContext);
    
    const {
        style,
        data,
        onDelete
    } = props;

    const [comment, setComment] = useState(data);

    // Update comment information from context
    const updateComment = () => {
        getComment(comment.id, newComment => {
            setComment(newComment);
        });
    };

    // When like button is pressed
    const handleLike = async () => {
        await likeComment(comment._id);
        await updateComment();
    };

    // When dislike button is pressed
    const handleDislike = async () => {
        await dislikeComment(comment._id);
        await updateComment();
    };

    return (
        <View style={[styles.comment, style]}>
            <Text style={styles.body}>{data.text}</Text>
            <View style={styles.actions}>
                <MoreOptions
                    content={comment}
                    onDelete={onDelete}
                />
                {/* Reply button */}
                <TouchableOpacity style={styles.reply}>
                        <ReplyIcon style={styles.replyIcon} width={20} height={20} color={ACTION_COLOR} />
                        <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
                <View style={styles.likeness}>
                    {/* Like Button */}
                    <TouchableIcon
                        size={sizes.ACTION_ICON}
                        onPress={handleLike}
                        Icon={
                            //comment.likes.includes(user._id)
                            //? LikeIconFill : LikeIconOutline
                            LikeIconOutline
                        }
                        color={
                            //comment.likes.includes(user._id)
                            //? colors.FROYO_GREEN : 'black'
                            'black'
                        }
                    />
                    {/* Disike Button */}
                    <TouchableIcon
                        size={sizes.ACTION_ICON}
                        onPress={handleDislike}
                        style={styles.dislike}
                        Icon={
                            //comment.dislikes.includes(user._id)
                            //? DislikeIconFill : DislikeIconOutline
                            DislikeIconOutline
                        }
                        color={
                            //comment.dislikes.includes(user._id)
                            //? colors.DISLIKE_RED : 'black'
                            'black'
                        }
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        backgroundColor: 'white',
        marginBottom: 5,
        padding: 20
    },
    body: {
        fontSize: 18,
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
    // Action bar
    actions: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    // Reply
    reply: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    replyText: {
        fontSize: 20,
        marginLeft: 5,
    },
    // Like/Dislike
    likeness: {
        flexDirection: 'row',
        marginLeft: 15
    },
    dislike: {
        marginLeft: 5,
        marginTop: 5
    }
});

export default Comment
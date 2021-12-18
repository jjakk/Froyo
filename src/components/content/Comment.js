import React, { useContext, useState } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
// Context
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import {
    Text,
    TouchableIcon
} from '../../components/froyo-elements';
import MoreOptions from './parts/MoreOptions';
// Constants
import { colors, sizes } from '../../constants/constants';
// Icons
import ReplyIcon from '../../../assets/icons/Reply.svg';
import LikeIconFill from '../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../assets/icons/Dislike-Outline.svg';

const ACTION_COLOR = 'black';

const Comment = (props) => {
    const { getComment, likeComment, dislikeComment } = useContext(CommentContext);
    
    const {
        style,
        data,
        onDelete,
        onError
    } = props;

    const [comment, setComment] = useState(data);

    // Update comment information from context
    const updateComment = async () => {
        await getComment(comment.id, (newComment, err) => {
            if(!err) setComment(newComment);
        });
    };

    // When like button is pressed
    const handleLike = async () => {
        await likeComment(comment.id, async (err) => {
            if (!err) {
                await updateComment();
            }
        });
    };

    // When dislike button is pressed
    const handleDislike = async () => {
        await dislikeComment(comment.id, async (err) => {
            if (!err) {
                await updateComment();
            }
        });
    };

    return (
        <TouchableWithoutFeedback>
            <View style={[styles.comment, style]}>
                <Text style={styles.body}>{data.text}</Text>
                <View style={styles.actions}>
                    <MoreOptions
                        content={comment}
                        onDelete={onDelete}
                        onError={onError}
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
                                comment.liking
                                ? LikeIconFill : LikeIconOutline
                            }
                            color={
                                comment.liking
                                ? colors.FROYO_GREEN : 'black'
                            }
                        />
                        {/* Disike Button */}
                        <TouchableIcon
                            size={sizes.ACTION_ICON}
                            onPress={handleDislike}
                            style={styles.dislike}
                            Icon={
                                comment.disliking
                                ? DislikeIconFill : DislikeIconOutline
                            }
                            color={
                                comment.disliking
                                ? colors.DISLIKE_RED : 'black'
                            }
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
        marginBottom: 5,
    },
    // Action bar
    actions: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
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
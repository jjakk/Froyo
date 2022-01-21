import React, { useContext, useState } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
// Context
import { Context as UserContext } from '../../context/UserContext';
import { Context as CommentContext } from '../../context/CommentContext';
// Components
import {
    Text,
    TouchableIcon
} from '../../components/froyo-elements';
import MoreOptions from './parts/MoreOptions';
import LikenessBar from './parts/LikenessBar';
// Constants
import { colors, sizes } from '../../constants/constants';
// Icons
import ReplyIcon from '../../../assets/icons/Reply.svg';
import LikeIconFill from '../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../assets/icons/Dislike-Outline.svg';

const Comment = (props) => {
    const { state: { user } } = useContext(UserContext); 
    const { likeComment, dislikeComment } = useContext(CommentContext);
    
    const {
        style,
        comment: passedComment,
        onDelete,
    } = props;

    const [comment, setComment] = useState(passedComment);

    // When like button is pressed
    const handleLike = async () => {
        setComment(await likeComment(comment.id));
    };

    // When dislike button is pressed
    const handleDislike = async () => {
        setComment(await dislikeComment(comment.id));
    };

    return (
        <TouchableWithoutFeedback>
            <View style={[styles.comment, style]}>
                <Text style={styles.body}>{comment.text}</Text>
                <View style={styles.actions}>
                    <MoreOptions
                        content={comment}
                        onDelete={onDelete}
                        style={styles.moreOptions}
                    />
                    {/* Reply button */}
                    <TouchableOpacity style={styles.reply}>
                            <ReplyIcon
                                style={styles.replyIcon}
                                width={sizes.ACTION_ICON_SMALLER}
                                height={sizes.ACTION_ICON_SMALLER}
                                color={colors.DARK_GREY}
                            />
                            <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                    <View style={styles.likenessContainer}>
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
                                    ? colors.FROYO_GREEN : colors.DARK_GREY
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
                                    ? colors.DISLIKE_RED : colors.DARK_GREY
                                }
                            />
                        </View>
                        <LikenessBar
                            show={comment.author.id === user.id}
                            like_count={comment.like_count}
                            dislike_count={comment.dislike_count}
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
        marginTop: 5,
    },
    body: {
        fontSize: 18,
        margin: 15
    },
    // Action bar
    actions: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    // More Options
    moreOptions: {
        marginBottom: 10
    },
    // Reply
    reply: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 10
    },
    replyText: {
        fontSize: 20,
        marginLeft: 5,
        color: colors.DARK_GREY
    },
    // Like/Dislike
    likenessContainer: {
        marginLeft: 15
    },
    likeness: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    dislike: {
        marginLeft: 5,
        marginTop: 5
    }
});

export default Comment
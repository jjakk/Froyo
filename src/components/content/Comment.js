import React, { useState } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
// Navigation
import { navigate } from '../../navigation/navigationRef';
// Components
import {
    Text,
    TouchableIcon
} from '../../components/froyo-elements';
import ContentHeader from './parts/ContentHeader';
import MoreOptions from './parts/MoreOptions';
import LikenessBar from './parts/LikenessBar';
// Context
import { useSettings } from '../../context/SettingsContext';
import { useUser} from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Constants
import { colors, sizes } from '../../constants/constants';
// Icons
import ReplyIcon from '../../../assets/icons/Reply.svg';
import LikeIconFill from '../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../assets/icons/Dislike-Outline.svg';

const Comment = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const { state: { user } } = useUser(); 
    const { likeContent, dislikeContent } = useContent();
    const darkModeEnabled = theme === 'dark' ;
    
    // Props
    const {
        style,
        comment: passedComment,
        onDelete,
    } = props;

    // State
    const [comment, setComment] = useState(passedComment);

    // Event handlers
    const onHeaderPress = () => {
        navigate('AccountView', { user: comment.author });
    };

    const onLike = async () => {
        setComment(await likeContent('comment', comment.id));
    };

    const onDislike = async () => {
        setComment(await dislikeContent('comment', comment.id));
    };

    return (
        <TouchableWithoutFeedback>
            <View style={[
                styles.comment,
                themeStyles[theme].comment,
                style
            ]}>
                <ContentHeader
                    content={comment}
                    onPress={onHeaderPress}
                    onDelete={onDelete}
                    condensed
                />
                <Text style={styles.body}>
                    {comment.text}
                </Text>
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
                                color={colors.light.THIRD}
                            />
                            <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                    <View style={styles.likenessContainer}>
                        <View style={styles.likeness}>
                            {/* Like Button */}
                            <TouchableIcon
                                size={sizes.ACTION_ICON}
                                onPress={onLike}
                                Icon={
                                    comment.liking
                                    ? LikeIconFill : LikeIconOutline
                                }
                                color={
                                    comment.liking
                                    ? colors.GREEN : colors.light.THIRD
                                }
                            />
                            {/* Disike Button */}
                            <TouchableIcon
                                size={sizes.ACTION_ICON}
                                onPress={onDislike}
                                style={styles.dislike}
                                Icon={
                                    comment.disliking
                                    ? DislikeIconFill : DislikeIconOutline
                                }
                                color={
                                    comment.disliking
                                    ? colors.DISLIKE_RED : colors.light.THIRD
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
        marginTop: 5,
    },
    body: {
        fontSize: 18,
        margin: 15,
        marginTop: 0,
        marginBottom: 5
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
        color: colors.light.THIRD
    },
    // Like/Dislike
    likenessContainer: {
        marginLeft: 15,
        marginRight: 15
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

const themeStyles = {
    light: StyleSheet.create({
        comment: {
            backgroundColor: colors.WHITE,
        }
    }),
    dark: StyleSheet.create({
        comment: {
            backgroundColor: colors.dark.THIRD,
        }
    })
};

export default Comment
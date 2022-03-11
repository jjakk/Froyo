import React, {
    useState,
    useEffect
} from 'react';
import {
    Appearance,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
// Navigation
import { navigate } from '../../navigation/navigationRef';
// Components
import { Text } from '../../components/froyo-elements';
import {
    LikeButton,
    DislikeButton
} from './parts/likeness-buttons';
import ContentHeader from './parts/ContentHeader';
import MoreOptions from './parts/MoreOptions';
import LikenessBar from './parts/LikenessBar';
// Context
import { useUser} from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Constants
import { colors, sizes } from '../../constants/constants';
// Icons
import ReplyIcon from '../../../assets/icons/Reply.svg';

const Comment = (props) => {
    // Context
    const theme = Appearance.getColorScheme();
    const { state: { user } } = useUser(); 
    const { likeContent, dislikeContent } = useContent();
    
    // Props
    const {
        style,
        data: passedComment,
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

    const onReply = () => {
        navigate('CommentCreate', { parentId: comment.id });
    };

    // Update comment when passed comment changes
    useEffect(() => {
        setComment(passedComment);
    }, [passedComment]);

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
                    <TouchableOpacity
                        onPress={onReply}
                        style={styles.reply}
                    >
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
                            <LikeButton
                                onPress={onLike}
                                content={comment}
                            />
                            <DislikeButton
                                onPress={onDislike}
                                content={comment}
                                style={styles.dislike}
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
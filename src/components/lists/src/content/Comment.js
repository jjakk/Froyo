import React, {
    useState,
    useEffect
} from "react";
import {
    Appearance,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import * as Haptics from "expo-haptics";
// Navigation
import { navigate } from "@froyo/navigation-ref";
// Components
import { Text } from "@froyo/elements";
import {
    LikeButton,
    DislikeButton
} from "./parts/likeness-buttons";
import ContentHeader from "./parts/ContentHeader";
import MoreOptions from "./parts/MoreOptions";
import LikenessBar from "./parts/LikenessBar";
// Context
import { useUser} from "@froyo/user-context";
import { useContent } from "@froyo/content-context";
// Constants
import { colors, sizes } from "@froyo/constants";
// Icons
import ReplyIcon from "../../../../../assets/icons/Reply.svg";

const Comment = (props) => {
    // Context
    const { state: { user } } = useUser(); 
    const { likeContent, dislikeContent } = useContent();

    // Theme
    const theme = Appearance.getColorScheme();
    
    // Props
    const {
        style,
        data: passedComment,
        onDelete,
    } = props;

    // State
    const [comment, setComment] = useState(passedComment);
    const [collapsed, setCollapsed] = useState(false);

    // Event handlers
    const onHeaderPress = () => {
        navigate("AccountView", { user: comment.author });
    };

    const onLike = async () => {
        setComment(await likeContent("comment", comment.id));
    };

    const onDislike = async () => {
        setComment(await dislikeContent("comment", comment.id));
    };

    const onReply = () => {
        navigate("CommentCreate", { parentId: comment.id });
    };

    const onCollapse = () => {
        if (!collapsed) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setCollapsed(true);
        }
    };

    const onUncollapse = () => {
        if (collapsed) {
            setCollapsed(false);
        }
    };

    // Update comment when passed comment changes
    useEffect(() => {
        setComment(passedComment);
    }, [passedComment]);

    return (
        <TouchableWithoutFeedback
            onPress={onUncollapse}
            onLongPress={onCollapse}
        >
            <View style={[
                themeStyles[theme].comment,
                collapsed ? {
                    height: 50,
                    opacity: 0.75,
                } : {},
                style
            ]}>
                <ContentHeader
                    content={comment}
                    onPress={onHeaderPress}
                    onDelete={onDelete}
                    condensed
                />
                {
                    !collapsed && (
                        <>
                        <Text style={styles.body}>
                            {comment.text}
                        </Text>
                        <View style={styles.actions}>
                            <MoreOptions
                                content={comment}
                                onDelete={onDelete}
                            />
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
                                        size={sizes.ACTION_ICON_SMALLER}
                                    />
                                    <DislikeButton
                                        onPress={onDislike}
                                        content={comment}
                                        style={styles.dislike}
                                        size={sizes.ACTION_ICON_SMALLER}
                                    />
                                </View>
                                <LikenessBar
                                    show={comment.author.id === user.id}
                                    like_count={comment.like_count}
                                    dislike_count={comment.dislike_count}
                                />
                            </View>
                        </View>
                        </>
                    )
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    body: {
        fontSize: 18,
        margin: 15,
        marginVertical: 0
    },
    // Action bar
    actions: {
        flexDirection: "row",
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
    },
    // Reply
    reply: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5,
    },
    replyText: {
        fontSize: 16,
        marginLeft: 5,
        color: colors.light.THIRD
    },
    // Like/Dislike
    likenessContainer: {
        marginRight: 5,
    },
    likeness: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10
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
import React, { useState, useEffect } from "react";
// Components
import {
    Appearance,
    StyleSheet,
    View,
    RefreshControl,
    Alert
} from "react-native";
import { Text, FlatList } from "@froyo/elements";
import Comment from "../content/Comment";
// Context
import { useContent } from "@froyo/content-context";
import { useSettings } from "@froyo/settings-context";
// Constants
import { colors } from "@froyo/constants";

const CommentList = (props) => {
    // Context
    const { getComments } = useContent();
    const { state: { primaryColors } } = useSettings();

    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark";

    // Props
    const {
        onRefresh,
        parent,
        refreshable=true,
        ...otherProps
    } = props;
    const parentType = parent.parent_id ? "comment" : "post";
    // rootContent determines if this is the comment list containg all the other sub-comment lists
    const rootContent = parentType === "post";

    // State
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Update comments when post is refreshed
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        
        getComments(parentType, parent.id)
        .then(retreivedComments => {
            if(mounted) setComments(retreivedComments);
        })
        .catch(err => {
            if(mounted) Alert.alert(err.message);
        })
        .finally(() => {
            if(mounted) setLoading(false);
        });

        return () => {
            setComments([]);
            mounted = false;
        };
    }, [parent]);

    const commentRender = ({ item }) => {
        return (
            <>
                <Comment
                    data={item}
                    onDelete={onRefresh}
                    style={
                        rootContent ? {
                            marginTop: 5
                        } : {
                            marginTop: 1,
                            borderColor: darkModeEnabled ? colors.dark.FIRST : colors.light.SECOND,
                            borderLeftWidth: 1
                        }
                    }
                />
                {
                    item.comments && (
                        <CommentList
                            onRefresh={onRefresh}
                            parent={item}
                            refreshable={false}
                            style={{
                                marginLeft: 5
                            }}
                        />
                    )
                }
            </>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        tintColor={primaryColors.MAIN}
                        colors={[primaryColors.MAIN]}
                        progressBackgroundColor={
                            darkModeEnabled
                            ? colors.light.FOURTH
                            : colors.WHITE
                        }
                        refreshing={refreshing}
                        onRefresh={async () => {
                            setRefreshing(true);
                            await onRefresh();
                            setRefreshing(false);
                        }}
                    />
                }
                renderItem={commentRender}
                ListEmptyComponent={() => (
                    rootContent ? (
                        loading ? (
                            <Text style={styles.noComments}>Loading</Text>
                        ) : (
                            <Text style={styles.noComments}>No comments</Text>
                        )
                    ) : null
                )}
                {...otherProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noComments: {
        fontSize: 28,
        alignSelf: "center",
        opacity: 0.75,
        margin: 50
    },
});

export default CommentList;

import React, { useState, useEffect } from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { Text } from '../froyo-elements';
import Comment from './Comment';
// Context
import { useContent } from '../../context/ContentContext';
// Constants
import { colors } from '../../constants/constants';

const CommentList = (props) => {
    // Context
    const theme = Appearance.getColorScheme();
    const { getComments } = useContent();
    const darkModeEnabled = theme === 'dark';

    // Props
    const {
        onDeleteComment,
        onPullDownRefresh,
        parent,
        refreshable=true,
        ...otherProps
    } = props;
    const parentType = parent.parent_id ? 'comment' : 'post';
    const rootContent = !parent.parent_id;

    // State
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Update comments when post is refreshed
    useEffect(() => {
        (async function(){
            setLoading(true);
            setComments(await getComments(parentType, parent.id));
            setLoading(false);
        })();
    }, [parent]);

    const commentRender = ({ item }) => {
        return (
            <>
                <Comment
                    data={item}
                    onDelete={onDeleteComment}
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
                            onDeleteComment={onDeleteComment}
                            onPullDownRefresh={onPullDownRefresh}
                            parent={item}
                            refreshable={refreshable}
                            style={{
                                marginLeft: 5
                            }}
                        />
                    )
                }
            </>
        );
    };

    // Event Handlers
    const onRefresh = async () => {
        setRefreshing(true);
        await onPullDownRefresh();
        setRefreshing(false);
    };

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container
        ]}>
            <FlatList
                data={loading ? [] : comments}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        tintColor={colors.GREEN}
                        colors={[colors.GREEN]}
                        progressBackgroundColor={darkModeEnabled ? colors.light.FOURTH : colors.WHITE}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
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
        alignSelf: 'center',
        opacity: 0.75,
        margin: 50
    },
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default CommentList;

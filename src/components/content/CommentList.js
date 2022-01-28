import React, { useState, useEffect } from 'react';
// Components
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { Text } from '../froyo-elements';
import Comment from './Comment';
// Context
import { useSettings } from '../../context/SettingsContext';
import { useContent } from '../../context/ContentContext';
// Constants
import { colors } from '../../constants/constants';

const CommentList = (props) => {
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark';
    const { getComments } = useContent();
    const {
        onDeleteComment,
        onPullDownRefresh,
        parent,
        HeaderComponent
    } = props;
    const parentType = parent.parent_id ? 'comment' : 'post';

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
                data={comments}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={HeaderComponent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        tintColor={darkModeEnabled ? colors.WHITE : colors.light.FOURTH}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => (
                    <Comment
                        comment={item}
                        onDelete={onDeleteComment}
                    />
                )}
                ListEmptyComponent={() => (
                    loading ? (
                        <Text style={styles.noComments}>Loading</Text>
                    ) : (
                        <Text style={styles.noComments}>No comments</Text>
                    )
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
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

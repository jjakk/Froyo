// This componet takes in a list of posts and renders them
import React from 'react';
// Components
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { LoadingAnimation } from '../froyo-elements';
import EmptyMessage from '../EmptyMessage';
import Post from './Post';
// Constants
import { colors } from '../../constants/constants';

const PostList = (props) => {
    const {
        posts,
        loading,
        emptyMessage,
        onPostDelete,
        onError,
        style,
        showLoadingAnimation,
        HeaderComponent,
        refreshable,
        refreshing,
        onRefresh,
        onUpdate
    } = props;

    return (
        <View style={[styles.container, style]}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={HeaderComponent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    refreshable ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    ) : null
                }
                renderItem={({ item }) => (
                    <Post
                        post={item}
                        onUpdate={onUpdate}
                        onDelete={onPostDelete}
                        onError={onError}
                        clickable
                    />
                )}
                ListEmptyComponent={() => (
                    <>
                    {
                        loading ? (
                            <>
                            {
                                showLoadingAnimation ? (
                                    <LoadingAnimation
                                        size={50}
                                        style={styles.postLoading}
                                    />
                                ) : null
                            }
                            </>
                        ) : (
                            <EmptyMessage
                                style={[
                                    styles.emptyMessage
                                ]}
                                subheaderText={emptyMessage}
                            />
                        )
                    }
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        flex: 1
    },
    posts: {
        paddingTop: 5,
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
        width: '100%'
    },
    emptyMessage: {
        marginTop: 50
    },
    postLoading: {
        alignSelf: 'center',
        marginTop: 50
    }
});

PostList.defaultProps = {
    sortBy: 'new',
    emptyMessageAlign: 'center',
    showLoadingAnimation: true,
    refreshable: false
};

export default PostList;

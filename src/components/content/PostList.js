// This componet takes in a list of posts and renders them
import React, { useEffect } from 'react';
import { LoadingAnimation } from '../froyo-elements';
// Components
import { StyleSheet, View } from 'react-native';
import EmptyMessage from '../EmptyMessage';
import Post from './Post';
// Constants
import { colors } from '../../constants/constants';

const PostList = (props) => {
    const [postsRender, setPostsRender] = React.useState([]);
    const {
        posts,
        loading,
        sortBy,
        emptyMessage,
        emptyMessageAlign,
        onPostDelete,
        onError,
        style,
        showLoadingAnimation
    } = props;

    // Sort posts before rendering
    useEffect(() => {
        switch (sortBy) {
            // Sort by date (newest first)
            case 'new':
                setPostsRender(
                    posts.sort(function (a, b) {
                        const dateA = new Date(a.timestamp).getTime();
                        const dateB = new Date(b.timestamp).getTime();
                        return dateB - dateA;
                    })
                );
        }
    }, [posts]);

    return (
        <View style={[styles.container, style]}>
            {
                !loading ?
                    (
                        postsRender.length > 0 ? (
                            <View style={styles.posts}>
                            {
                                postsRender.map(post => (
                                    <Post
                                        key={post.id}
                                        data={{
                                            ...post,
                                        }}
                                        onDelete={onPostDelete}
                                        onError={onError}
                                        clickable
                                    />
                                ))
                            }
                            </View>
                        ) : (
                            <EmptyMessage
                                style={[
                                    styles.emptyMessage,
                                    {
                                        alignSelf: emptyMessageAlign,
                                        marginTop: emptyMessageAlign === 'flex-start' ? 50 : 0,
                                    }
                                ]}
                                subheaderText={emptyMessage}
                            />
                        )
                    ) : showLoadingAnimation ? (
                        <LoadingAnimation
                            size={50}
                            style={styles.postLoading}
                        />
                    ) : null
            }
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
        width: '100%'
    },
    postLoading: {
        alignSelf: 'flex-start',
        marginTop: 50
    }
});

PostList.defaultProps = {
    sortBy: 'new',
    emptyMessageAlign: 'center',
    showLoadingAnimation: true
};

export default PostList;

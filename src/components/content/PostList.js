// This componet takes in a list of posts and renders them
import React, { useEffect } from 'react';
import * as Progress from 'react-native-progress';
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
        style
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
        <View style={[styles.posts, style]}>
            {
                !loading ?
                    (
                        postsRender.length > 0 ? (
                            <View style={styles.postView}>
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
                                        alignSelf: emptyMessageAlign
                                    }
                                ]}
                                subheaderText={emptyMessage}
                            />
                        )
                    ) : (
                        <LoadingAnimation
                            size={50}
                            style={styles.postLoading}
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    posts: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    postView: {
        paddingTop: 5,
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
        width: '100%'
    },
    emptyMessage: {
        marginTop: 50,
    },
    postLoading: {
        alignSelf: 'flex-start',
        marginTop: 50
    }
});

PostList.defaultProps = {
    sortBy: 'new',
    emptyMessageAlign: 'center'
};

export default PostList;

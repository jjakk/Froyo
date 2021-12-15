// This componet takes in a list of posts and renders them
import React, { useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View } from 'react-native';
import EmptyMessage from '../EmptyMessage';
import Post from './Post';

const PostList = (props) => {
    const [postsRender, setPostsRender] = React.useState([]);
    const {
        posts,
        loading,
        sortBy,
        emptyMessage,
        onPostDelete
    } = props;
    console.log(posts);

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
        <View style={styles.posts}>
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
                                        clickable
                                    />
                                ))
                            }
                            </View>
                        ) : (
                            <EmptyMessage
                                style={styles.emptyMessage}
                                subheaderText={emptyMessage}
                            />
                        )
                    ) : (
                        <Progress.CircleSnail
                            size={50}
                            indeterminate={true}
                            spinDuration={1000}
                            color='#41CA99'
                            style={styles.postLoading}
                        />
                    )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    posts: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    postView: {
        marginTop: 15,
        paddingTop: 5,
        flex: 1,
        backgroundColor: '#F2F2F2',
        width: '100%'
    },
    emptyMessage: {
        marginTop: 50,
    },
    postLoading: {
        marginTop: 50,
    }
});

PostList.defaultProps = {
    sortBy: 'new'
};

export default PostList;

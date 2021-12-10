// This componet takes in a list of posts and renders them in chronological order
import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View } from 'react-native';
import { EmptyMessage } from '../EmptyMessage';
import Post from './Post';

const PostList = (props) => {
    const {
        posts,
        loading,
        onPostDelete
    } = props;

    return (
        <View style={styles.posts}>
            {
                !loading ?
                    (
                        posts.length > 0 ? (
                            <View style={styles.postView}>
                            {
                                posts.map(post => (
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
                                subheaderText="You haven't posted anything yet"
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
        marginTop: 5,
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

export default PostList;

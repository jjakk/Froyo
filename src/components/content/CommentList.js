// This componet takes in a list of comments and renders them
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../froyo-elements';
import Comment from './Comment';

const CommentList = (props) => {
    const {
        comments,
        loading,
        onDeleteComment
    } = props;

    return (
        <View style={styles.container}>
            {
                !loading ? (
                    comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment
                                key={comment.id}
                                data={comment}
                                onDelete={onDeleteComment}
                            />
                        ))
                    ) : (
                        <Text style={styles.noComments}>No comments</Text>
                    )
                ) : (
                    <Text style={styles.noComments}>Loading</Text>
                )
                
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5
    },
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
    },
});

export default CommentList;

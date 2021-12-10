// This componet takes in a list of comments and renders them
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../froyo-elements';
import Comment from './Comment';

const CommentList = (props) => {
    const [commentsRender, setCommentsRender] = React.useState(null);
    const {
        comments,
        loading,
        sortBy,
        onDeleteComment
    } = props;

    // Sort comments before rendering
    useEffect(() => {
        switch (sortBy) {
            // Sort by date (newest first)
            case 'new':
                setCommentsRender(
                    comments.sort(function (a, b) {
                        const dateA = new Date(a.timestamp).getTime();
                        const dateB = new Date(b.timestamp).getTime();
                        return dateB - dateA;
                    })
                );
        }
    }, [comments]);

    return (
        <View>
            {
                !loading ? (
                    commentsRender.length > 0 ? (
                        commentsRender.map(comment => (
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
    noComments: {
        fontSize: 28,
        alignSelf: 'center',
        opacity: 0.75,
        marginTop: 50
    },
});

CommentList.defaultProps = {
    sortBy: 'new'
};

export default CommentList;

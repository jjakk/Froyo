import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View } from 'react-native';
// Components
import { Input } from '../components/froyo-elements';
// Context
import { Context as CommentContext } from '../context/CommentContext';
// Icons
import SendIcon from '../../assets/icons/Send.svg';
// Constants
import { colors } from '../constants/constants';

// ParentId -> string: ID of the content that's being commented one
// onCreateComment -> function: callback function to be called when the comment is created
const CommentBar = (props) => {
    const { createComment } = useContext(CommentContext);
    const [commentText, setCommentText] = useState('');
    const {
        style,
        parentId,
        onCreateComment,
    } = props;

    const onSubmit = () => {
        const content = {
            body: commentText,
            parent: parentId
        };
        createComment(content, (error) => {
            if(!error) setCommentText('');
            onCreateComment(error);
        });
    };

    return (
        <View style={[styles.bar, style]}>
            <Input
                style={styles.input}
                placeholder='Comment...'
                value={commentText}
                onChangeText={setCommentText}
            />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <SendIcon style={styles.send} width={35} height={35} color={colors.FROYO_GREEN}/>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        backgroundColor: 'white',
        height: 100,
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#F2F2F2',
        borderTopWidth: 2
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderWidth: 0,
        flex: 1
    },
    send: {
        marginLeft: 25
    }
});

export default CommentBar;

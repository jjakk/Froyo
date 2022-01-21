import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
// Components
import { Input } from '../froyo-elements';
// Context
import { Context as ContentContext } from '../../context/ContentContext';
// Icons
import SendIcon from '../../../assets/icons/Send.svg';
// Constants
import { colors } from '../../constants/constants';

// ParentId -> string: ID of the content that's being commented one
// onCreateComment -> function: callback function to be called when the comment is created
const CommentBar = (props) => {
    const { createContent } = useContext(ContentContext);
    const [commentText, setCommentText] = useState('');
    const {
        style,
        parent_id,
        onCreateComment
    } = props;

    const onSubmit = async () => {
        const content = {
            text: commentText,
            parent_id
        };
        await createContent('comment', content);
        setCommentText('');
        onCreateComment();
    };

    return (
        <View style={[styles.bar, style]}>
            <Input
                style={styles.input}
                placeholder='Comment...'
                value={commentText}
                onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={onSubmit}>
                <SendIcon style={styles.send} width={35} height={35} color={colors.GREEN}/>
            </TouchableOpacity>
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

import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';
// Components
import { Input } from '../components/froyo-elements';
// Icons
import SendIcon from '../../assets/icons/Send.svg';
// Constants
import { colors } from '../constants/constants';

const CommentBar = (props) => {
    const [commentText, setCommentText] = useState();
    const {
        style,
        onCreate
    } = props;

    const onSubmit = () => {
        console.log('Comment : ' + commentText);
        onCreate(commentText);
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
                <SendIcon style={styles.send} width={35} height={35} color={colors.froyoGreen}/>
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
        justifyContent: 'center'
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

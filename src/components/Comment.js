import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from '../components/froyo-elements';
// Icons
import MoreOptionsIcon from '../../assets/icons/MoreSettings.svg';
import ReplyIcon from '../../assets/icons/Reply.svg';
import LikeIcon from '../../assets/icons/Like-Outline.svg';
import DislikeIcon from '../../assets/icons/Dislike-Outline.svg';

const ACTION_SIZE = 25;
const ACTION_COLOR = 'black';

const Comment = (props) => {
    
    const {
        style,
        text
    } = props;

    return (
        <View style={[styles.comment, style]}>
            <Text style={styles.body}>{text}</Text>
            <View style={styles.actions}>
                <TouchableWithoutFeedback>
                    <MoreOptionsIcon style={styles.moreOptions} width={20} height={20} color={ACTION_COLOR} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.reply}>
                        <ReplyIcon style={styles.replyIcon} width={20} height={20} color={ACTION_COLOR} />
                        <Text style={styles.replyText}>Reply</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.likeness}>
                    <TouchableWithoutFeedback>
                        <LikeIcon width={ACTION_SIZE} height={ACTION_SIZE} color={ACTION_COLOR} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <DislikeIcon style={styles.dislike} width={ACTION_SIZE} height={ACTION_SIZE} color={ACTION_COLOR} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            {/*
                Like button
                Dislike button
                More options
                Reply
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        backgroundColor: 'white',
        marginBottom: 5,
        padding: 15
    },
    body: {
        marginBottom: 15
    },
    // Action bar
    actions: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    // Reply
    reply: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    replyText: {
        fontSize: 20,
        marginLeft: 5,
    },
    // Like/Dislike
    likeness: {
        flexDirection: 'row',
        marginLeft: 15
    },
    dislike: {
        marginLeft: 5,
        marginTop: 5
    }
});

export default Comment
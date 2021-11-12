import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Br } from '../../components/froyo-elements';
// Icons
import MoreOptionsIcon from '../../../assets/icons/MoreSettings.svg';
import ReplyIcon from '../../../assets/icons/Reply.svg';
import LikeIcon from '../../../assets/icons/Like-Outline.svg';
import DislikeIcon from '../../../assets/icons/Dislike-Outline.svg';

const ACTION_SIZE = 25;
const ACTION_COLOR = 'black';

const Comment = (props) => {
    
    const {
        style,
        text,
        authorName
    } = props;

    return (
        <View style={[styles.comment, style]}>
            <View style={styles.header}>
            <Image
                style={styles.profilePicture}
                source={require('../../../assets/icons/guest.png')}
                resizeMode='contain'
            />
            <Text style={styles.headerText}>
                <Text style={styles.author}>{authorName}</Text>
                <Br/>
                <Text style={styles.age}>{
                    contentLoaded ? (
                        calculateAge(timestamp)
                    ) : null
                    
                }</Text>
            </Text>
            </View>
            <Text style={styles.body}>{text}</Text>
            <View style={styles.actions}>
                <TouchableOpacity>
                    <MoreOptionsIcon style={styles.moreOptions} width={20} height={20} color={ACTION_COLOR} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.reply}>
                        <ReplyIcon style={styles.replyIcon} width={20} height={20} color={ACTION_COLOR} />
                        <Text style={styles.replyText}>Reply</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.likeness}>
                    <TouchableOpacity>
                        <LikeIcon width={ACTION_SIZE} height={ACTION_SIZE} color={ACTION_COLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <DislikeIcon style={styles.dislike} width={ACTION_SIZE} height={ACTION_SIZE} color={ACTION_COLOR} />
                    </TouchableOpacity>
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
        padding: 20
    },
    body: {
        fontSize: 18,
        marginBottom: 5
    },
    // Header
    header: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    options: {
        position: 'absolute',
        right: 0,
        top: 0,
        opacity: 0.75
    },
    headerText: {
        marginLeft: 15
    },
    profilePicture: {
        width: 50,
        height: 50
    },
    author: {
        fontSize: 22
    },
    age: {
        fontSize: 14
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
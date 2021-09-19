import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Text, Br } from './froyo-elements';
import MoreOptionsIcon from '../../assets/icons/MoreSettings.svg';
import LikeIcon from '../../assets/icons/Like.svg';
import DislikeIcon from '../../assets/icons/Dislike.svg';
import CommentIcon from '../../assets/icons/Comment.svg';
import ShareIcon from '../../assets/icons/Share.svg';

const ACTION_BUTTON_SIZE = 25;
const AVERAGE_WEEKS_PER_MONTH = 4.34524;

// Post props & their meanings
// ___________________________
// personalPost -> whether the post is your own or not
// author -> the name of the author
// uploadDate -> the date the post was uploaded
// text -> the text body of the post
// imageSrc -> the image of the post
// onDelete -> the function to call when the delete button is pressed
// onEdit -> the function to call when the edit button is pressed
// onPress -> the function to call when the post is tapped on

const Post = ({ personalPost, author, uploadDate, text, imageSrc, onEdit, onDelete, onPress }) => {
    
    // Calculate the time since the post was uploaded in miliseconds
    const calculatePostAge = (dateOfUpload) => {
        const today = new Date();
        const postDate = new Date(dateOfUpload);
        const millisecondsDiff = Math.abs(postDate - today);
        return formatPostAge(millisecondsDiff);
    }

    // Format the time since the post was uploaded (given miliseconds)
    const formatPostAge = (miliseconds) => {
        // Calculate all the different time units
        const secondsDiff = Math.floor(miliseconds / 1000);
        const minutesDiff = Math.floor(secondsDiff / 60);
        const hoursDiff = Math.floor(minutesDiff / 60);
        const daysDiff = Math.floor(hoursDiff / 24);
        const weeksDiff = Math.floor(daysDiff / 7);
        const monthsDiff = Math.floor(weeksDiff / AVERAGE_WEEKS_PER_MONTH);
        const yearsDiff = Math.floor(monthsDiff / 12);

        // Return the correct time unit
        if(minutesDiff < 1) return `${secondsDiff} second${secondsDiff > 1 ? 's' : ''}`;
        if(hoursDiff < 1) return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        if(daysDiff < 1) return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
        if(weeksDiff < 1) return `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        if(monthsDiff < 1) return `${weeksDiff} week${weeksDiff > 1 ? 's' : ''}`;
        if(yearsDiff < 1) return `${monthsDiff} month${monthsDiff > 1 ? 's' : ''}`;
        return `${yearsDiff} years`;
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.post}>
                <View style={styles.header}>
                    <Menu style={styles.options}>
                        <MenuTrigger>
                            <MoreOptionsIcon name='options-vertical' height={24} width={24} color='black' />
                        </MenuTrigger>
                        <MenuOptions style={{margin: 10}}>
                            {
                                personalPost ? (
                                    <>
                                        <MenuOption onSelect={onEdit}>
                                            <Text>Edit post</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={onDelete}>
                                            <Text style={styles.deleteButton}>Delete post</Text>
                                        </MenuOption>
                                    </>
                                ) : null
                            }
                        </MenuOptions>
                    </Menu>
                    <Image
                        style={styles.profilePicture}
                        source={require('../../assets/icons/guest.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.headerText}>
                        <Text style={styles.author}>{author}</Text>
                        <Br/>
                        <Text style={styles.age}>{calculatePostAge(uploadDate)}</Text>
                    </Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.likeness}>
                        <TouchableWithoutFeedback>
                            <LikeIcon width={ACTION_BUTTON_SIZE} height={ACTION_BUTTON_SIZE} color='black'/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <DislikeIcon width={ACTION_BUTTON_SIZE} height={ACTION_BUTTON_SIZE} style={styles.dislike}  color='black'/>
                        </TouchableWithoutFeedback>
                    </View>
                    <CommentIcon width={ACTION_BUTTON_SIZE} height={ACTION_BUTTON_SIZE} style={styles.comment}  color='black'/>
                    <TouchableWithoutFeedback>
                        <ShareIcon width={ACTION_BUTTON_SIZE} height={ACTION_BUTTON_SIZE}  color='black'/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
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
    // Post body
    body: {
        margin: 15,
        marginTop: 0
    },
    // Actions
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        marginTop: 0,
        alignItems: 'center'
    },
    likeness: {
        flexDirection: 'row'
    },
    dislike: {
        marginTop: 5,
        marginLeft: 5
    },
    comment: {
        marginRight: 40
    },
    deleteButton: {
        color: '#FB1C1C',
        opacity: 0.75
    }
});

export default Post;
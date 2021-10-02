import React, { useEffect } from 'react';
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
import { calculatePostAge } from '../helperFunctions/age';

const ACTION_BUTTON_SIZE = 25;

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

const Post = (props) => {

    const {
        personalPost,
        author,
        uploadDate,
        text,
        imageSrc,
        onEdit,
        onDelete,
        onPress,
        style
    } = props;

    // More options menu items
    const moreOptions = [
        // Only show these options if it's your own post
        ...(personalPost ? [
            {
                label: 'Delete',
                onSelect: onDelete,
                style: styles.deleteButton
            },
            {
                label: 'Edit',
                onSelect: onEdit,
                style: null
            }
        ]: []),
        // The rest of the options
        {
            label: 'Share',
            onSelect: () => {},
            style: null
        },
        {
            label: 'Save',
            onSelect: () => {},
            style: null
        }
    ];

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.post, style]}>
                <View style={styles.header}>
                    <Menu style={styles.options}>
                        <MenuTrigger>
                            <MoreOptionsIcon name='options-vertical' height={24} width={24} color='black' />
                        </MenuTrigger>
                        <MenuOptions style={styles.moreOptions}>
                            {
                                moreOptions.map(option => (
                                    <MenuOption key={option.label} onSelect={option.onSelect}>
                                        <Text style={option.style}>{option.label}</Text>
                                    </MenuOption>
                                ))
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
    },
    moreOptions: {
        margin: 10
    }
});

export default Post;
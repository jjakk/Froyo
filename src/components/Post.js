import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Text, Br } from './froyo-elements';
import { calculateAge } from '../helperFunctions/age';
// Icons
import MoreOptionsIcon from '../../assets/icons/MoreSettings.svg';
import LikeIcon from '../../assets/icons/Like.svg';
import DislikeIcon from '../../assets/icons/Dislike.svg';
import CommentIcon from '../../assets/icons/Comment.svg';
import ShareIcon from '../../assets/icons/Share.svg';
import TrashIcon from '../../assets/icons/Trash.svg';
import PenIcon from '../../assets/icons/Pen.svg';
import SaveIcon from '../../assets/icons/Save.svg';

const ACTION_ICON_SIZE = 25;
const OPTION_ICON_SIZE = 20;

// Post props & their meanings
// ___________________________
// id -> string: the id of the post
// clickable -> boolean: whether clicking on the post should trigger onPress
// personalPost -> boolean: whether the post is your own or not
// author -> string: the name of the author
// uploadDate -> date: the date the post was uploaded
// text -> string: the text body of the post
// imageSrc -> string: the source of the image of the post
// onDelete -> function: the function to call when the delete button is pressed
// onEdit -> function: the function to call when the edit button is pressed
// onPress -> function: the function to call when the post is tapped on

const Post = (props) => {

    const {
        id,
        clickable,
        personalPost,
        author,
        uploadDate,
        text,
        imageSrc,
        onEdit,
        onDelete,
        onPress,
        style,
        navigation
    } = props;

    // Default function to call when a post is tapped on
    const defaultOnPress = () => {
        navigation.navigate('PostView', { id });
    };

    // Default functions for edit button
    const defaultOnEdit = () => {
        navigation.navigate('PostEdit', { id });
    };
    
    // Default function for delete button
    const defaultOnDelete = () => {

    };

    // More options menu items
    const moreOptions = [
        // Only show these options if it's your own post
        ...(personalPost ? [
            {
                label: 'Delete',
                onSelect: onDelete || defaultOnDelete,
                style: styles.deleteButton,
                icon: (
                    <TrashIcon
                        width={OPTION_ICON_SIZE}
                        height={OPTION_ICON_SIZE}
                        color='#FB1C1C'
                    /> 
                )
            },
            {
                label: 'Edit',
                onSelect: onEdit || defaultOnEdit,
                style: null,
                icon: (
                    <PenIcon
                        width={OPTION_ICON_SIZE}
                        height={OPTION_ICON_SIZE}
                        color='black'
                    /> 
                )
            }
        ]: []),
        // The rest of the options
        {
            label: 'Save',
            onSelect: () => {},
            style: null,

            icon: (
                <SaveIcon
                    width={OPTION_ICON_SIZE}
                    height={OPTION_ICON_SIZE}
                    color='black'
                /> 
            )
        }
    ];

    return (
        <TouchableWithoutFeedback
            onPress={
                clickable
                    ? (onPress || defaultOnPress)
                    : null
            }
        >
            <View style={[styles.post, style]}>
                <View style={styles.header}>
                    <Menu style={styles.options}>
                        <MenuTrigger>
                            <MoreOptionsIcon name='options-vertical' height={ACTION_ICON_SIZE} width={ACTION_ICON_SIZE} color='black' />
                        </MenuTrigger>
                        <MenuOptions style={styles.moreOptions}>
                            {
                                moreOptions.map(option => (
                                    <MenuOption key={option.label} onSelect={option.onSelect}>
                                        <View style={styles.optionView}>
                                            {option.icon}
                                            <Text style={[option.style, styles.optionText]}>{option.label}</Text>
                                        </View>
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
                        <Text style={styles.age}>{calculateAge(uploadDate)}</Text>
                    </Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.likeness}>
                        <TouchableWithoutFeedback>
                            <LikeIcon
                                width={ACTION_ICON_SIZE}
                                height={ACTION_ICON_SIZE}
                                color='black'
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <DislikeIcon
                                width={ACTION_ICON_SIZE}
                                height={ACTION_ICON_SIZE}
                                style={styles.dislike}
                                color='black'
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <CommentIcon
                        width={ACTION_ICON_SIZE}
                        height={ACTION_ICON_SIZE}
                        style={styles.comment}
                        color='black'
                    />
                    <TouchableWithoutFeedback>
                        <ShareIcon
                            width={ACTION_ICON_SIZE}
                            height={ACTION_ICON_SIZE}
                            color='black'
                        />
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
        color: '#FB1C1C'
    },
    // More options menu
    moreOptions: {
        margin: 10
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 20,
        marginLeft: 10
    }
});

export default Post;
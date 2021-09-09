import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

const actionButtonSize = 25;

const Post = ({ author, age, text, imageSrc, onDelete }) => {
    return (
        <View style={styles.post}>
            <View style={styles.header}>
                <Menu style={styles.options}>
                    <MenuTrigger>
                        <MoreOptionsIcon name='options-vertical' height={24} width={24} color='black' />
                    </MenuTrigger>
                    <MenuOptions style={{margin: 10}}>
                        <MenuOption onSelect={onDelete} >
                            <Text style={styles.deleteButton}>Delete post</Text>
                        </MenuOption>
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
                    <Text style={styles.age}>{age}</Text>
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.actions}>
                <View style={styles.likeness}>
                    <TouchableOpacity>
                        <LikeIcon width={actionButtonSize} height={actionButtonSize} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <DislikeIcon width={actionButtonSize} height={actionButtonSize} style={styles.dislike}  color='black'/>
                    </TouchableOpacity>
                </View>
                <CommentIcon width={actionButtonSize} height={actionButtonSize} style={styles.comment}  color='black'/>
                <TouchableOpacity>
                    <ShareIcon width={actionButtonSize} height={actionButtonSize}  color='black'/>
                </TouchableOpacity>
            </View>
        </View>
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
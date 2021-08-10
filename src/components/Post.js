import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Br } from './froyo-elements';
import { SimpleLineIcons } from '@expo/vector-icons';

const Post = ({ author, age, text, imageSrc }) => {
    return (
        <View style={styles.post}>
            <View style={styles.header}>
                <SimpleLineIcons style={styles.options} name='options-vertical' size={24} color='black' />
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
        </View>
    );
};

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        marginTop: 5
    },
    // Header
    header: {
        margin: 25,
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
        margin: 25,
        marginTop: 0
    }
});

export default Post;
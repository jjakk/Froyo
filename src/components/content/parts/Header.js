import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
// Components
import { Text, Br } from '../../froyo-elements';
// Helper functions
import { calculateAge } from '../../../helperFunctions/age';

const Header = (props) => {
    const {
        post,
        condensed
    } = props;

    return (
        <View style={styles.header}>
            <Image
                style={styles.profilePicture}
                source={require('../../../../assets/icons/guest.png')}
                resizeMode='contain'
            />
            <Text style={styles.headerText}>
                <Text style={styles.author}>{post.authorName}</Text>
                <Br/>
                <Text style={styles.age}>{ calculateAge(post.timestamp) || '' }</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // Regular header
    header: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center'
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
    }
    // Condensed header
});

export default Header;


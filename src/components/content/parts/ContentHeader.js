import React from 'react';
import {
    TouchableWithoutFeedback,
    Image,
    View,
    StyleSheet
} from 'react-native';
// Components
import { Text, Br } from '../../froyo-elements';
import MoreOptions from './MoreOptions';
// Helper functions
import { calculateAge } from '../../../helperFunctions/age';

const ContentHeader = (props) => {
    const {
        post,
        onPress,
        onDelete,
        condensed
    } = props;

    return (
        <View style={styles.header}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.userInfo}>
                    <Image
                        style={styles.profilePicture}
                        source={require('../../../../assets/icons/guest.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.headerText}>
                        <Text style={styles.author}>
                            {`${post.author.first_name} ${post.author.last_name}`}
                        </Text>
                        <Br/>
                        <Text style={styles.age}>{ calculateAge(post.timestamp) || '' }</Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <MoreOptions
                content={post}
                onDelete={onDelete}
                style={styles.options}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // Regular header
    header: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
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
    },
    // More options
    options: {
        opacity: 0.75
    },
    // Condensed header
});

export default ContentHeader;


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
        content,
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
                            {`${content.author.first_name} ${content.author.last_name}`}
                        </Text>
                        <Br/>
                        <Text style={styles.age}>{ calculateAge(content.timestamp) || '' }</Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            {
                !condensed ? (
                    <MoreOptions
                        content={content}
                        onDelete={onDelete}
                        style={styles.options}
                    />
                ) : null
            }
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
});

export default ContentHeader;


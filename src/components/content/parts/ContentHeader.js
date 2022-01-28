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
// Context
import { useSettings } from '../../../context/SettingsContext';
// Helper functions
import { calculateAge } from '../../../helperFunctions/age';

const ContentHeader = (props) => {
    const { state: { theme } } = useSettings();
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
                        style={[
                            styles.profilePicture,
                            condensed ? condensedStyles.profilePicture : null
                        ]}
                        source={require('../../../../assets/icons/guest.png')}
                        resizeMode='contain'
                    />
                    <Text>
                        <Text style={[
                            styles.author,
                            condensed ? condensedStyles.author : null
                        ]}>
                            {`${content.author.first_name} ${content.author.last_name}`}
                        </Text>
                        {
                            !condensed ? (
                                <Br/>
                            ) : (
                                <Text> | </Text>
                            )
                        }
                        <Text
                            style={styles.age}
                        >
                            { calculateAge(content.timestamp) || '' }
                        </Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePicture: {
        width: 50,
        height: 50,
        marginRight: 15
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

const condensedStyles = StyleSheet.create({
    profilePicture: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    author: {
        fontSize: 18
    },
});

export default ContentHeader;


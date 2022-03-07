import React from 'react';
// Components
import { View, Image, StyleSheet } from 'react-native';
import { Text, TouchableIcon } from '../froyo-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
// Icons
import MoreSettingsIcon from '../../../assets/icons/MoreSettings.svg';
// Constants
import { colors, BASE_URL } from '../../constants/constants';

const Meetup = (props) => {
    // Context
    const { state: { theme } } = useSettings();

    // Props
    const {
        style,
        data,
    } = props;

    const {
        title,
        description,
        date,
        time,
        location,
        author
    } = data;

    // Conditional rendering
    const authorProfilePicture = (
        author.profile_picture_bucket_key
        ? {
            uri: `${BASE_URL}/images/${content.author.profile_picture_bucket_key}`
        }
        : require('../../../assets/icons/guest.png')
    );

    return (
        <View style={[themeStyles[theme].container, style]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Title</Text>
                    <View style={styles.author}>
                        <Image source={authorProfilePicture} style={styles.authorPicture} />
                        <Text style={styles.authorName}>{author.first_name} {author.last_name}</Text>
                    </View> 
                </View>
                <TouchableIcon
                    Icon={MoreSettingsIcon}
                />
            </View>
            <View style={styles.details}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontSize: 32
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorPicture: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    authorName: {
        fontSize: 22
    }
});

const themeStyles = {
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD,
        }
    }),
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE,
        }
    }),
};

export default Meetup;
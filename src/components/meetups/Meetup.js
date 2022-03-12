import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { Text, TouchableIcon, Button } from '../froyo-elements';
// Icons
import MoreSettingsIcon from '../../../assets/icons/MoreSettings.svg';
import LocationIcon from '../../../assets/icons/Location.svg';
// Constants
import { colors, BASE_URL } from '../../constants/constants';

const Meetup = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        style,
        data,
    } = props;

    const {
        title,
        joined,
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
        <TouchableWithoutFeedback>
            <View style={[
                styles.container,
                themeStyles[theme].container,
                style
            ]}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
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
                    <LocationIcon
                        width={20}
                        height={20}
                        color={
                            darkModeEnabled
                            ? colors.light.FIRST
                            : colors.dark.FIRST
                        }
                        style={styles.locationIcon}
                    />
                    <Text>
                        {location} @{date.getMonth()}/{date.getDate()}/{date.getFullYear()}
                    </Text>
                    <View style={[
                        styles.dateDivider,
                        themeStyles[theme].dateDivider
                    ]} />
                    <Text>
                        {time}
                    </Text>
                </View>
                {
                    description && (
                        <Text style={styles.description}>
                            {description}
                        </Text>
                    )
                }
                <View style={styles.actions}>
                {
                    joined ? (
                        <View style={styles.joined}>
                            <View style={styles.actionButtonContainer}>
                                <Button
                                    title='Chat'
                                    pill
                                />
                            </View>
                            <View style={styles.gap} />
                            <View style={styles.actionButtonContainer}>
                                <Button
                                    title='Leave'
                                    type='secondary'
                                    pill
                                    color={colors.DISLIKE_RED}
                                />
                            </View>
                        </View>
                    ) : (
                        <Button
                            title='Join'
                            pill
                            buttonStyle={styles.joinButton}
                        />
                    )
                }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    title: {
        fontSize: 26,
        flex: 1,
        marginBottom: 5
    },
    // Author stuff
    author: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorPicture: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    authorName: {
        fontSize: 18
    },
    // Details
    details: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationIcon: {
        marginRight: 5
    },
    dateDivider: {
        borderRadius: 2,
        width: 2,
        height: 20,
        marginHorizontal: 5,
    },
    // Description
    description: {
        marginTop: 10,
        marginBottom: 10
    },
    // Actions
    actions: {
        flex: 1,
        marginVertical: 10,
    },
    joinButton: {
        flex: 1,
    },
    joined: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButtonContainer: {
        flex: 1,
    },
    gap: {
        width: 25,
    }
});

const themeStyles = {
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD,
        },
        dateDivider: {
            backgroundColor: colors.dark.FIRST
        }
    }),
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE,
        },
        dateDivider: {
            backgroundColor: colors.light.SECOND
        }
    }),
};

export default Meetup;
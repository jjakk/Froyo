import React from "react";
// Components
import {
    Appearance,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { Text, TouchableIcon, Button } from "@froyo/elements";
// Icons
import {
    MoreOptionsIcon,
    LocationIcon,
    guestProfilePicture,
    awsBucketImage
} from "@froyo/icons";
// Constants
import { colors } from "@froyo/constants";

const Meetup = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark" ;

    // Props
    const {
        style,
        data,
    } = props;

    const {
        title,
        joined,
        description,
        location,
        members,
        author
    } = data;

    // Conditional rendering
    const authorProfilePicture = (
        author.profile_picture_bucket_key
        ? awsBucketImage(author.profile_picture_bucket_key)
        : guestProfilePicture()
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
                        <Text style={styles.memberCount}>{members ? members.length : 0} Members</Text>
                    </View>
                    <TouchableIcon
                        Icon={MoreOptionsIcon}
                    />
                </View>
                {
                    location && (
                        <View style={styles.location}>
                            <LocationIcon
                                width={10}
                                height={20}
                                color={
                                    darkModeEnabled
                                    ? colors.light.FIRST
                                    : colors.dark.FIRST
                                }
                            />
                            <Text style={styles.locationText}>
                                {location}
                            </Text>
                        </View>
                    )
                }
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
                                    title="Chat"
                                    pill
                                    titleStyle={styles.buttonText}
                                />
                            </View>
                            <View style={styles.gap} />
                            <View style={styles.actionButtonContainer}>
                                <Button
                                    title="Leave"
                                    type="secondary"
                                    pill
                                    color={colors[theme].RED}
                                    titleStyle={styles.buttonText}
                                />
                            </View>
                        </View>
                    ) : (
                        <Button
                            title="Join"
                            pill
                            buttonStyle={styles.joinButton}
                            titleStyle={styles.buttonText}
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
        padding: 15,
        marginBottom: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 26,
        flex: 1,
        marginBottom: 10
    },
    // Author stuff
    author: {
        flexDirection: "row",
        alignItems: "center"
    },
    authorPicture: {
        height: 20,
        width: 20,
        borderRadius: 20,
        marginRight: 10
    },
    authorName: {
        fontSize: 18
    },
    // Details
    memberCount: {
        fontSize: 14,
        marginTop: 10
    },
    details: {
        flexDirection: "column"
    },
    location: {
        opacity: 0.75,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 16
    },
    // Description
    description: {
        marginTop: 10,
        marginBottom: 0
    },
    // Actions
    buttonText: {
        fontSize: 18,
    },
    actions: {
        flex: 1,
        marginVertical: 15,
    },
    joinButton: {
        flex: 1
    },
    joined: {
        flexDirection: "row",
        justifyContent: "space-between",
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
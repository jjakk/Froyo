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
import { MoreOptionsIcon, LocationIcon, guestProfilePicture } from "@froyo/icons";
// Constants
import { colors, BASE_URL } from "@froyo/constants";

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
        : guestProfilePicture
    );

    // Set date text to Today, Tomorrow or the date (in format MM/DD/YYYY)
    const formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    const dateText = (
        date.getMonth() === (new Date()).getMonth()
        && date.getFullYear() === (new Date()).getFullYear()
            ? (
                date.getDate() === (new Date()).getDate()
                    ? "Today"
                    : date.getDate() === (new Date()).getDate() + 1
                        ? "Tomorrow"
                        :  formatedDate
            ) : formatedDate
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
                        Icon={MoreOptionsIcon}
                    />
                </View>
                <View style={styles.details}>
                    <View style={styles.location}>
                        <LocationIcon
                            width={20}
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
                    <View style={styles.time}>
                        <Text>@</Text>
                        <Text style={styles.dateText}>
                            {dateText}
                        </Text>
                        <View style={[
                            styles.dateDivider,
                            themeStyles[theme].dateDivider
                        ]} />
                        <Text>
                            {time}
                        </Text>
                    </View>
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
                                    title="Chat"
                                    pill
                                />
                            </View>
                            <View style={styles.gap} />
                            <View style={styles.actionButtonContainer}>
                                <Button
                                    title="Leave"
                                    type="secondary"
                                    pill
                                    color={colors[theme].RED}
                                />
                            </View>
                        </View>
                    ) : (
                        <Button
                            title="Join"
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
        padding: 15,
        marginBottom: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
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
        marginRight: 10
    },
    authorName: {
        fontSize: 18
    },
    // Details
    details: {
        flexDirection: "column"
    },
    location: {
        opacity: 0.75,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    locationText: {
        textDecorationLine: "underline",
        marginLeft: 5
    },
    time: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateText: {
        marginLeft: 5
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
        marginBottom: 0
    },
    // Actions
    actions: {
        flex: 1,
        marginVertical: 15,
    },
    joinButton: {
        flex: 1,
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
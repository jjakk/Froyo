import React from "react";
import {
    TouchableWithoutFeedback,
    Image,
    View,
    StyleSheet
} from "react-native";
// Components
import { Text } from "@froyo/elements";
import MoreOptions from "./MoreOptions";
// Context
import { useSettings } from "@froyo/settings-context"
// Icons
import { guestProfilePicture } from "@froyo/icons";
// Helper functions
import { calculateAge } from "@froyo/helpers";
// Constants
import { API_ENDPOINT } from "@froyo/constants";

const ContentHeader = (props) => {
    // Context
    const { state: { flavor } } = useSettings();

    // Props
    const {
        content,
        onPress,
        onDelete,
        condensed,
        style
    } = props;

    // Conditional rendering
    const profilePictureSource = (
        content.author.profile_picture_bucket_key
        ? {
            uri: `${API_ENDPOINT}/images/${content.author.profile_picture_bucket_key}`
        }
        : guestProfilePicture(flavor)
    );

    return (
        <View style={[styles.header, style]}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.userInfo}>
                    <Image
                        style={[
                            styles.profilePicture,
                            condensed ? condensedStyles.profilePicture : null
                        ]}
                        source={profilePictureSource}
                        resizeMode="cover"
                    />
                    <View
                        style={[
                            styles.author,
                            condensed ? condensedStyles.author : null
                        ]}
                    >
                        <Text>
                            {`${content.author.first_name} ${content.author.last_name}`}
                        </Text>
                        {
                            condensed && (
                                <Text> | </Text>
                            )
                        }
                        <Text
                            style={styles.age}
                        >
                            { calculateAge(content.timestamp) || "" }
                        </Text>
                    </View>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 15
    },
    author: {
        fontSize: 22,
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
        fontSize: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ContentHeader;


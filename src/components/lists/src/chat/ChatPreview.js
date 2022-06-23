import React from "react";
// Components
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Appearance
} from "react-native";
import { Text } from "@froyo/elements";
// Context
import { useSettings } from "@froyo/settings-context";
// Icons
import {
    guestProfilePicture,
    groupProfilePicture
} from "@froyo/icons";
// Navigation
import { navigate } from "@froyo/navigation-ref";
// Constants
import { colors } from "@froyo/constants";

const ChatPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Context
    const { state: { flavor } } = useSettings();
    
    // Props
    const {
        id,
        title,
        members
    } = props;

    const profilePictureSource = (
        members.length > 2
            ? groupProfilePicture(flavor)
            : guestProfilePicture(flavor)
    );

    // Event handlers
    const onOpenChat = () => {
        navigate("ChatMain", {
            chatId: id
        });
    };

    return (
        <TouchableOpacity onPress={onOpenChat}>
            <View style={[styles.container, themeStyles[theme].container]}>
                <Image
                    source={profilePictureSource}
                    style={styles.profilePicture}
                />
                <View>
                    <Text style={styles.title}>
                        {
                            title || (
                                members.length > 2
                                    ? "Group Chat"
                                    : "Chat"
                            )
                        }
                    </Text>
                    <Text style={styles.subtitle}>{members.length} Members</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    profilePicture: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        opacity: 0.5,
        fontSize: 16,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE,
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.SECOND,
        }
    })
};

export default ChatPreview;
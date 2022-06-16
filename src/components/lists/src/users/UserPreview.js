import React from "react";
// Components
import {
    StyleSheet,
    Appearance,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { Text } from "@froyo/elements";
// Context
import { useSettings } from "@froyo/settings-context";
// Icons
import { guestProfilePicture } from "@froyo/icons";
// Constants
import { API_ENDPOINT, colors } from "@froyo/constants";
// Navigation
import { navigate } from "@froyo/navigation-ref";

const UserPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Context
    const { state: { flavor } } = useSettings();

    // Props
    const {
        user,
        style
    } = props;

    // User info
    const {
        first_name,
        last_name,
        profile_picture_bucket_key
    } = user;
    
    // Conditional rendering
    const profilePictureSource = (
        profile_picture_bucket_key
        ? {
            uri: `${API_ENDPOINT}/images/${profile_picture_bucket_key}`
        }
        : guestProfilePicture(flavor)
    );

    // Event handlers
    const onPress = () => {
        navigate("AccountView", { user });
    };

    return (
        <View
            style={[
                styles.container,
                themeStyles[theme].container,
                style
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
            >
                <Text>
                    <Image
                        source={profilePictureSource}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.name}>
                        {first_name} {last_name}
                    </Text>
                </Text>
            </TouchableOpacity>
            <View style={styles.action}>
                {/*
                    (
                        <>
                            <TouchableIcon
                                Icon={PlusCircleIcon}
                                color={colors.GREEN}
                                size={30}
                            />
                            <TouchableIcon
                                Icon={CloseCircleIcon}
                                color={colors.DISLIKE_RED}
                                size={30}
                            />
                        </>
                    )
                */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    name: {
        marginLeft: 10,
        fontSize: 20
    },
    action: {
        flexDirection: "row",
        alignItems: "center"
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST,
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD,
        }
    })
};

export default UserPreview;
import React from "react";
// Components
import {
    StyleSheet,
    Appearance,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import {
    Text,
    Button,
    TouchableIcon
} from "../froyo-elements";
// Constants
import { BASE_URL, colors } from "../../constants/constants";
// Navigation
import { navigate } from "../../navigation/navigationRef";
// Icons
import PlusCircleIcon from "../../../assets/icons/Plus-Circle.svg";
import CloseCircleIcon from "../../../assets/icons/Close-Circle.svg";

const UserPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

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
            uri: `${BASE_URL}/images/${profile_picture_bucket_key}`
        }
        : require("../../../assets/icons/guest.png")
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
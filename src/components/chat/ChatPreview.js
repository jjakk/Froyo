import React from "react";
// Components
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Appearance
} from "react-native";
import { Text } from "../froyo-elements";
// Navigation
import { navigate } from "../../navigation/navigationRef";
// Constants
import { colors } from "../../constants/constants";

const ChatPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    
    // Props
    const {
        id,
        title,
        subtitle,
        members
    } = props;

    const profilePictureSource = (
        members.length > 1 ?
            require("../../../assets/icons/group.png")
            : require("../../../assets/icons/guest.png")
    );

    // Event handlers
    const onOpenChat = () => {
        navigate("ChatMain", {
            id
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
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
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
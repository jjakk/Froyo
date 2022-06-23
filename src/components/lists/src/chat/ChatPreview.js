import React from "react";
// Components
import OptionsMenu from "react-native-option-menu";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Appearance,
    Alert
} from "react-native";
import { Text, TouchableIcon } from "@froyo/elements";
// Context
import { useSettings } from "@froyo/settings-context";
import { useChat } from "@froyo/chat-context";
// Icons
import {
    MoreOptionsIcon,
    guestProfilePicture,
    groupProfilePicture
} from "@froyo/icons";
// Navigation
import { navigate } from "@froyo/navigation-ref";
// Constants
import { colors, sizes } from "@froyo/constants";

const ChatPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    // Context
    const { state: { flavor } } = useSettings();
    const { deleteChat } = useChat();
    
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

    const onEdit = () => {
        Alert.alert("Chat Editing Not Implemented");
    };

    const onDelete = async () => {
        try{
            await deleteChat(id);
        }
        catch (err) {
            throw new Error(err.response.data);
        }
    };

    const onDeletePrompt = () => {
        Alert.alert(
            "Are you sure you want to delete this chat?",
            "This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: onDelete
                }
            ],
        );
    };

    // More options menu items
    const options = [
        {
            label: "Edit",
            onSelect: onEdit,
        }, {
            label: "Delete",
            onSelect: onDeletePrompt,
        }, {
            label: "Cancel",
        }
    ];

    const optionLabels = options.map(option => option.label);
    const optionHandlers = options.map(option => option.onSelect);

    return (
        <TouchableOpacity onPress={onOpenChat}>
            <View style={[styles.container, themeStyles[theme].container]}>
                <Image
                    source={profilePictureSource}
                    style={styles.profilePicture}
                />
                <View style={styles.mainSection}>
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
                <OptionsMenu
                    customButton={(
                        <TouchableIcon
                            Icon={MoreOptionsIcon}
                            size={sizes.ACTION_ICON_SMALLER}
                            TouchableComponent={View}
                        />
                    )}
                    destructiveIndex={optionLabels.indexOf("Delete")}
                    options={optionLabels}
                    actions={optionHandlers}
                />
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
    mainSection: {
        flex: 1
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
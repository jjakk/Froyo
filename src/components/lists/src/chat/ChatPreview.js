import React, { useState, useEffect } from "react";
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
import { useUser } from "@froyo/user-context";
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
    const { getUser, state: { user: signedInUser } } = useUser();
    const { deleteChat } = useChat();

    // State
    const [chatTitle, setChatTitle] = useState(null);
    
    // Props
    const {
        data,
        unread,
        onDelete
    } = props;

    const {
        id,
        title,
        members
    } = data;

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
        Alert.alert("Chat editing not implemented yet");
    };

    const onDeleteChat = async () => {
        try{
            await deleteChat(id);
            await onDelete();
        }
        catch (err) {
            throw new Error(err.message);
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
                    onPress: onDeleteChat
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

    useEffect(() => {
        if(members.length > 2){
            setChatTitle(title || "Group Chat");
            return;
        }
        
        for(const memberId of members){
            if(memberId !== signedInUser.id){
                getUser(memberId)
                .then(user => {
                    setChatTitle(`${user.first_name} ${user.last_name}`);
                })
                .catch(err => {
                    Alert.alert(err);
                });
            }
        }
    }, []);

    return (
        <TouchableOpacity onPress={onOpenChat}>
            <View style={[styles.container, themeStyles[theme].container]}>
                <Image
                    source={profilePictureSource}
                    style={styles.profilePicture}
                />
                <View style={styles.mainSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            { chatTitle || "Loading" }
                        </Text>
                        {
                            unread && (
                                <View style={styles.unreadDot}/>
                            )
                        }
                    </View>
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
    textContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginLeft: 10,
        backgroundColor: colors.GRAY
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
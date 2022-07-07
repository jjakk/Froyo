import React, { useEffect, useState } from "react";
// Components
import {
    View,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Appearance
} from "react-native";
import { Text } from "@froyo/elements";
// Context
import { useSettings } from "@froyo/settings-context";
import { useUser } from "@froyo/user-context";
// Navigation
import { navigate } from "@froyo/navigation-ref";
// Constants
import { colors } from "@froyo/constants";

const Message = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const { state: { primaryColors } } = useSettings();
    const { getUser, state: { user: signedInUser } } = useUser();

    const [user, setUser] = useState(null);
        
    // Props
    const {
        data: {
            text,
            author_id,
            showLabel
        }
    } = props;

    const self = author_id === signedInUser.id;

    const goToUser = () => {
        navigate("AccountView", { user });
    };

    useEffect(() => {
        if(self) return;
        getUser(author_id)
        .then((user) => {
            setUser(user);
        })
        .catch(() => {});
    }, []);

    return (
        <Pressable style={styles.container}>
            {
                (!self && user) && (
                    <TouchableOpacity
                        onPress={goToUser}
                        style={styles.authorNameContainer}
                    >
                        <Text style={styles.authorName}>{`${user.first_name} ${user.last_name}`}</Text>
                    </TouchableOpacity>
                )
            }
            <View style={[
                styles.bubble,
                self ? {
                    alignSelf: "flex-end",
                    backgroundColor: primaryColors.DARK
                } : themeStyles[theme].other
            ]}>
                <Text style={[
                    styles.text,
                    themeStyles[theme].otherText,
                    self ? styles.selfText : styles.otherText
                ]}>{text}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    bubble: {
        padding: 15,
        marginBottom: 5,
        alignSelf: "flex-start",
        borderRadius: 15,
        maxWidth: "80%"
    },
    text: {
        fontSize: 16,
    },
    selfText: {
        color: colors.WHITE
    },
    authorNameContainer: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 5
    },
    authorName: {
        fontSize: 12,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        other: {
            backgroundColor: colors.light.SECOND
        },
        otherText: {
            color: colors.BLACK
        }
    }),
    dark: StyleSheet.create({
        other: {
            backgroundColor: colors.dark.FIRST
        },
        otherText: {
            color: colors.WHITE
        }
    })
};

export default Message;
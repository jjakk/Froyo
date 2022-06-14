import React from "react";
// Components
import { View, Image, StyleSheet, Appearance } from "react-native";
import { Text } from "@froyo/elements";
// Context
import { useSettings } from "@froyo/settings-context";
// Constants
import { colors } from "@froyo/constants";

const Message = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const { state: { primaryColors } } = useSettings();
        
    // Props
    const {
        data: {
            text,
            self,
            authorName
        }
    } = props;

    return (
        <View style={styles.container}>
            {
                !self && (
                    <Text style={styles.authorName}>{authorName}</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        padding: 15,
        marginBottom: 5,
        alignSelf: "flex-start",
        borderRadius: 15
    },
    text: {
        fontSize: 16,
    },
    selfText: {
        color: colors.WHITE
    },
    authorName: {
        fontSize: 12,
        marginLeft: 10,
        marginBottom: 5
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
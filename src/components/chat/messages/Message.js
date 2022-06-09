import React from "react";
// Components
import { View, Image, StyleSheet, Appearance } from "react-native";
import { Text } from "../../froyo-elements";
// Context
import { useSettings } from "../../../context/SettingsContext";
// Constants
import { colors } from "../../../constants/constants";

const Message = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const { state: { primaryColors } } = useSettings();
        
    // Props
    const {
        data: {
            text,
            self,
            showAuthor
        }
    } = props;

    return (
        <View style={styles.container}>
            {
                !self && (
                    <Text style={styles.authorName}>Author Name</Text>
                )
            }
            <View style={[
                styles.bubble,
                self ? {
                    alignSelf: "flex-end",
                    backgroundColor: primaryColors.DARKER
                } : themeStyles[theme].other
            ]}>
                <Text style={[
                    styles.text,
                    self ? styles.selfText : null
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
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        other: {
            backgroundColor: colors.dark.FIRST
        }
    })
};

export default Message;
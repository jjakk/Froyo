import React from "react";
// Components
import {
    Appearance,
    StyleSheet,
    TextInput as DefaultTextInput,
    View
} from "react-native";
// Constants
import { colors } from "@froyo/constants";

const TextInput = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark" ;

    // Props
    const {
        style,
        textStyle,
        leftIcon,
        rightIcon
    } = props;

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            {
                (leftIcon ? (
                    <View style={[styles.icon, styles.leftIcon]}>
                        {leftIcon}
                    </View>
                ) : null)
            }
            <DefaultTextInput
                {...props}
                selectionColor={darkModeEnabled ? colors.WHITE : colors.light.THIRD}
                placeholderTextColor={colors.light.THIRD}
                style={[
                    styles.text,
                    themeStyles[theme].text,
                    textStyle
                ]}
            />
            {
                (rightIcon ? (
                    <View style={[styles.icon, styles.rightIcon]}>
                        {rightIcon}
                    </View>
                ) : null)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: "Nunito",
        fontSize: 16,
        flex: 1
    },
    icon: {
        opacity: 0.5
    },
    leftIcon: {
        marginRight: 10
    },
    rightIcon: {
        marginLeft: 10
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        },
        text: {
            color: colors.light.FOURTH
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FIRST
        },
        text: {
            color: colors.light.FIRST
        }
    })
};

export default TextInput;




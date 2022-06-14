import React, { useState } from "react";
import {
    Appearance,
    StyleSheet,
} from "react-native";
import { View } from "react-native";
// Components
import {
    TextInput,
    TouchableIcon
} from "@froyo/elements";
// Context
import { useSettings } from "@froyo/settings-context";
// Icons
import SendIcon from "../../../../assets/icons/Send.svg";
// Constants
import { colors } from "@froyo/constants";

// ParentId -> string: ID of the content that's being commented one
// onCreateComment -> function: callback function to be called when the comment is created
const CommentBar = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark" ;

    // Context
    const { state: { primaryColors } } = useSettings();

    // State
    const [commentText, setCommentText] = useState("");
    
    // Props
    const {
        style,
        onSubmit
    } = props;

    const onSend = () => {
        onSubmit(commentText);
        setCommentText("");
    };

    return (
        <View style={[
            styles.bar,
            themeStyles[theme].bar,
            style
        ]}>
            <TextInput
                style={[
                    styles.input,
                    themeStyles[theme].input
                ]}
                textStyle={
                    themeStyles[theme].inputText
                }
                multiline
                placeholder="Comment..."
                placeholderTextColor={darkModeEnabled ? colors.light.FIRST : colors.light.SECOND}
                value={commentText}
                onChangeText={setCommentText}
            />
            <TouchableIcon
                Icon={SendIcon}
                style={styles.send}
                size={35}
                color={primaryColors.MAIN}
                onPress={onSend}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: "100%",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 2
    },
    input: {
        borderWidth: 0,
        maxHeight: 250,
        flex: 1
    },
    send: {
        marginLeft: 25
    }
});

const themeStyles = {
    light: StyleSheet.create({
        bar: {
            borderTopColor: colors.light.FIRST,
            backgroundColor: colors.WHITE
        },
        input: {
            backgroundColor: colors.light.FIRST
        },
        inputText: {
            color: colors.light.FOURTH
        }
    }),
    dark: StyleSheet.create({
        bar: {
            borderTopWidth: 0,
            backgroundColor: colors.dark.THIRD
        },
        input: {
            backgroundColor: colors.dark.FIRST
        },
        inputText: {
            color: colors.light.FIRST
        }
    })
};

export default CommentBar;

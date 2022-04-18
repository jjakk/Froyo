import React from "react";
import {
    Appearance,
    StyleSheet
} from "react-native";
// Components
import { Text as DefaultText } from "react-native";
import Hyperlink from "react-native-hyperlink";
// Constants
import { colors } from "../../constants/constants";

const Text = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    
    // Props
    const {
        children,
        style
    } = props;

    return (
        <Hyperlink
            linkDefault
            linkStyle={styles.hyperlink}
        >
            <DefaultText
                {...props}
                style={[
                    styles.text,
                    themeStyles[theme].text,
                    style
                ]}
            >
                {children}
            </DefaultText>
        </Hyperlink>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Nunito",
        fontSize: 18
    },
    hyperlink: {
        textDecorationLine: "underline"
    }
});

const themeStyles = {
    light: StyleSheet.create({
        text: {
            color: colors.light.FOURTH
        }
    }),
    dark: StyleSheet.create({
        text: {
            color: colors.light.SECOND
        }
    })
};

export default Text;



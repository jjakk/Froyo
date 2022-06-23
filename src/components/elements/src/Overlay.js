import React from "react";
import { StyleSheet, Appearance } from "react-native";
// Components
import { Overlay as OverlayDefault } from "react-native-elements";
// Constants
import { colors } from "@froyo/constants"

const Overlay = (props) => {
    const theme = Appearance.getColorScheme();

    const {
        children,
        overlayStyle,
        ...restOfProps
    } = props;

    return (
        <OverlayDefault
            overlayStyle={[
                themeStyles[theme].overlay,
                overlayStyle
            ]}
            {...restOfProps}
        >
            {children}
        </OverlayDefault>
    );
};

const themeStyles = {
    light: StyleSheet.create({
        overlay: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        overlay: {
            backgroundColor: colors.dark.THIRD
        }
    })
};

export default Overlay;
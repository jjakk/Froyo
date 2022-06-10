import React from "react";
// Components
import {
    Appearance,
    StyleSheet,
    FlatList as DefaultFlatList
} from "react-native";
// Constants
import { colors } from "../../constants/constants";

const FlatList = (props) => {
    const theme = Appearance.getColorScheme();
    const {
        style,
        ...restOfProps
    } = props;

    return (
        <DefaultFlatList
            style={[
                themeStyles[theme].list,
                style
            ]}
            {...restOfProps}
        />
    );
};

const themeStyles = {
    light: StyleSheet.create({
        list: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        list: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default FlatList;

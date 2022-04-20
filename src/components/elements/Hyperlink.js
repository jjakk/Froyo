import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";


const Hyperlink = (props) => {
    const {
        children,
        style
    } = props;

    return(
        <TouchableOpacity {...props}>
            <Text style={style} >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default Hyperlink;

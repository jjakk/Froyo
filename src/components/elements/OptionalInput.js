import React from "react";
// Components
import { StyleSheet, View } from "react-native";
import Hyperlink from "./Hyperlink";
import Input from "./Input";

const OptionalInput = (props) => {
    const showInput = false;
    const {
        label,
        placeholder,
        style
    } = props;

    return (
        <View style={style}>
            {
                showInput ? (
                    <Input
                        placeholder={placeholder}
                    />
                ) : (
                    <Hyperlink style={styles.link}>
                        {label}
                    </Hyperlink>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    link: {
        textDecorationLine: "underline"
    }
});

export default OptionalInput;
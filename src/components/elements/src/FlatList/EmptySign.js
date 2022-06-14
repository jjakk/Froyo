import React from "react";
// Components
import { View, StyleSheet } from "react-native";
import Text from "../Text";

const EmptySign = (props) => {
    const {
        text="Nothing to show",
        style
    } = props;

    return (
        <View style={[styles.container, style]}>
            <Text style={[
                styles.text,
                {
                    fontSize: (
                        text.length > 25 ? 18 : 22
                    )
                }
            ]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        opacity: 0.7,
        width: 300
    },
    text: {
        textAlign: "center",
        fontSize: 18
    }
});

export default EmptySign;
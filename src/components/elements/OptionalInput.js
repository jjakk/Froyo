import React, { useState } from "react";
// Components
import { StyleSheet, View } from "react-native";
import Hyperlink from "./Hyperlink";
import Input from "./Input";
import TouchableIcon from "./TouchableIcon";
// Icons
import CloseCircleIcon from "../../../assets/icons/Close-Circle.svg";

const OptionalInput = (props) => {
    const [showInput, setShowInput] = useState(false);
    const {
        label,
        placeholder,
        style
    } = props;
    
    const onToggle = () => {
        setShowInput(!showInput);
    };

    return (
        <View style={style}>
            {
                showInput ? (
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder={placeholder}
                            style={styles.input}
                        />
                        <TouchableIcon
                            Icon={CloseCircleIcon}
                            size={35}
                            onPress={onToggle}
                            style={styles.removeIcon}
                        />
                    </View>
                ) : (
                    <Hyperlink
                        style={styles.link}
                        onPress={onToggle}
                    >
                        {label}
                    </Hyperlink>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
    },
    removeIcon: {
        marginLeft: 15
    },
    link: {
        textDecorationLine: "underline"
    }
});

export default OptionalInput;
import React, { useState } from "react";
// Components
import { StyleSheet, View } from "react-native";
import Hyperlink from "./Hyperlink";
import TextInput from "./TextInput";
import TouchableIcon from "./TouchableIcon";
import Text from "./Text";
// Icons
import CloseCircleIcon from "../../../assets/icons/Close-Circle.svg";

const OptionalInput = (props) => {
    const [showInput, setShowInput] = useState(false);
    const {
        label,
        placeholder,
        style,
        Input=TextInput,
        inputUnits,
        value,
        onChangeText
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
                            value={value}
                            onChangeText={onChangeText}
                        />
                        {inputUnits && (
                            <Text style={styles.inputUnits}>
                                {inputUnits}
                            </Text>
                        )}
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
    inputUnits: {
        marginLeft: 15,
        fontSize: 24
    },
    removeIcon: {
        marginLeft: 15
    },
    link: {
        textDecorationLine: "underline"
    }
});

export default OptionalInput;
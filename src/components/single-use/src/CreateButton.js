import React from "react";
// Components
import { TouchableWithoutFeedback } from "react-native";
import { TouchableIcon } from "@froyo/elements";
// Icons
import { CreateIcon } from "@froyo/icons";
// Context
import { useSettings } from "@froyo/settings-context";
// Navigation
import { navigate } from "@froyo/navigation-ref";

const CreateButton = (props) => {
    // Context
    const {
        state: {
            primaryColors
        }
    } = useSettings();

    // Props
    const {
        style,
    } = props;

    const onPress = () => {
        navigate("PostCreate");
    };

    return (
        <TouchableIcon
            Icon={CreateIcon}
            TouchableComponent={TouchableWithoutFeedback}
            onPress={onPress}
            size={75}
            style={style}
            color={primaryColors.MAIN}
        />
    );
};

export default CreateButton;
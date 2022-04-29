import React from "react";
// Components
import { TouchableWithoutFeedback } from "react-native";
import { TouchableIcon } from "./froyo-elements";
// Icons
import CreateIcon from "../../assets/icons/Create.svg";
// Context
import { useSettings } from "../context/SettingsContext";
// Navigation
import { navigate } from "../navigation/navigationRef";

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
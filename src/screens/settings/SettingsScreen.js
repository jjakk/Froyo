import React from "react";
// Components
import SettingsOptions from "../../components/settings/SettingsList";;
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";

const SettingsScreen = ({ navigation }) => {

    const settings = [
        {
            title: "Appearance",
            type: "button",
            onPress: () => navigation.navigate("AppearanceSettings")
        },
        {
            title: "Account",
            type: "button",
            onPress: () => navigation.navigate("AccountSettings")
        },
        {
            title: "Help",
            type: "button",
            onPress: () => navigation.navigate("HelpSettings")
        },
    ];

    return (
        <ScreenContainer>
            <Header
                title="Settings"
            />
            <SettingsOptions settings={settings} />
        </ScreenContainer>
    );
};

export default SettingsScreen;


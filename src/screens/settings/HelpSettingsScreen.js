import React from "react";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
// Components
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import SettingsList from "../../components/settings/SettingsList";

const HelpSettingsScreen = () => {

    const settings = [
        {
            title: "Contact Support",
            type: "button",
            onPress: () => {
                Linking.openURL("mailto: support@protosapps.com")
                .catch(err => {
                    Alert.alert("Couldn't open email client", null);
                })
            }
        }
    ];
    
    return (
        <ScreenContainer>
            <Header
                title="Help"
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default HelpSettingsScreen;
import React from "react";
import { Alert } from "react-native";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { SettingsList } from "@froyo/lists";
// Context
import { useUser } from "@froyo/user-context";
// Constants
import { colors } from "@froyo/constants";

const AccountSettingsScreen = () => {
    // Context
    const { deleteUser } = useUser();

    const settings = [
        {
            title: "Delete Account",
            type: "button",
            color: colors.DISLIKE_RED,
            onPress:() => {

                Alert.alert(
                    "Are you sure you would like to delete your account?",
                    "This action cannot be undone. Doing so will delete all content linked to your account.",
                    [
                        {
                            text: "No",
                            style: "cancel"
                        }, {
                            text: "Yes",
                            style: "destructive",
                            onPress: deleteUser
                        }
                    ], { cancelable: true }
                );
            }
        }
    ];

    return (
        <ScreenContainer>
            <Header
                title="Account"
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default AccountSettingsScreen;
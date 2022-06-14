import React from "react";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { SettingsList } from "@froyo/lists";
// Context
import { useUser } from "@froyo/user-context";
// Helper functions
import confirmAlert from "@froyo/helpers";
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
                confirmAlert(
                    {
                        title: "Are you sure you would like to delete your account?",
                        subtitle: "\nThis action cannot be undone. Doing so will delete all of your posts and comments"
                    }, async () => {
                        await deleteUser();
                    }
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
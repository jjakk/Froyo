import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import SettingsList from '../../components/settings/SettingsList';
// Context
import { useUser } from '../../context/UserContext';
// Helper functions
import confirmAlert from '../../helpers/confirmAlert';
// Constants
import { colors } from '../../constants/constants';

const AccountSettingsScreen = () => {
    // Context
    const { deleteUser } = useUser();

    const settings = [
        {
            title: 'Delete Account',
            type: 'button',
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
                title='Account'
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default AccountSettingsScreen;
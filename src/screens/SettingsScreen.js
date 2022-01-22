import React, { useContext } from 'react';
// Components
import { StyleSheet } from 'react-native';
import SettingsOptions from '../components/settings/SettingsList';;
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
// Context
import { Context as SettingsContext } from '../context/SettingsContext';
import { Context as UserContext } from '../context/UserContext';
// Constants
import { colors } from '../constants/constants';
// Helper functions
import confirmAlert from '../helperFunctions/confirmAlert'

const SettingsScreen = ({ navigation }) => {
    const { deleteUser } = useContext(UserContext);
    const { setDarkModeEnable, state: { darkModeEnabled } } = useContext(SettingsContext);
    
    const settings = [
        {
            title: 'Dark Mode',
            type: 'toggle',
            value: darkModeEnabled,
            onToggle: () => {
                setDarkModeEnable(!darkModeEnabled);
            }
        },
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
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <Header
                navigation={navigation}
                title='Settings'
            />
            <SettingsOptions settings={settings} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE
    }
});

export default SettingsScreen;


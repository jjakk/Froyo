import React from 'react';
// Components
import { StyleSheet } from 'react-native';
import SettingsOptions from '../components/settings/SettingsList';;
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
// Context
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
// Constants
import { colors } from '../constants/constants';
// Helper functions
import confirmAlert from '../helperFunctions/confirmAlert'

const SettingsScreen = ({ navigation }) => {
    const { deleteUser } = useUser();
    const { setTheme, state: { theme } } = useSettings();

    const settings = [
        {
            title: 'Dark Mode',
            type: 'toggle',
            value: theme === 'dark',
            onToggle: () => {
                setTheme(theme !== 'dark' ? 'dark' : 'light');
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
            edges={['top']}
        >
            <Header
                navigation={navigation}
                style={styles.header}
                title='Settings'
            />
            <SettingsOptions settings={settings} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 0,
    }
});

export default SettingsScreen;


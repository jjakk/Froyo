import React from 'react';
import {
    Appearance,
    Alert,
    Platform
} from 'react-native';
import * as Linking from 'expo-linking';
// Components
import SettingsOptions from '../components/settings/SettingsList';;
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
// Context
import { useUser } from '../context/UserContext';
// Constants
import { colors } from '../constants/constants';
// Helper functions
import confirmAlert from '../helpers/confirmAlert'

const SettingsScreen = ({ navigation }) => {
    // Context
    const { deleteUser } = useUser();

    // Theme
    const theme = Appearance.getColorScheme();

    const settings = [
        {
            title: 'Change Theme',
            type: 'button',
            value: theme === 'dark',
            onPress: () => {
                const message = `To change the theme you must change your system theme${Platform.OS === 'ios' ? ' in settings under "Display & Brightness"' : ''}`;
                Alert.alert(
                    message,
                    null,
                    Platform.OS === 'ios' ? [
                        {
                            text: 'Cancel',
                            style: 'cancel'
                            
                        },
                        {
                            text: 'Open Settings',
                            onPress: () => {
                                Linking.openURL('App-prefs:root=DISPLAY&path=APPEARANCE_OPTIONS')
                            }
                        }
                    ] : null
                );
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
        <ScreenContainer>
            <Header
                navigation={navigation}
                title='Settings'
            />
            <SettingsOptions settings={settings} />
        </ScreenContainer>
    );
};

export default SettingsScreen;


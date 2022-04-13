import React from 'react';
// Components
import {
    Alert,
    Platform
} from 'react-native';
import * as Linking from 'expo-linking';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import SettingsList from '../../components/settings/SettingsList';

const AppearanceSettingsScreen = () => {

    const settings = [
        {
            title: 'Change Theme',
            type: 'button',
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
        }
    ];
    
    return (
        <ScreenContainer>
            <Header
                title='Appearance'
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default AppearanceSettingsScreen;
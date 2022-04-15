import React from 'react';
import {
    Alert,
    Platform
} from 'react-native';
import * as Linking from 'expo-linking';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import SettingsList from '../../components/settings/SettingsList';
// Context
import { useSettings } from '../../context/SettingsContext';
// Helper functions
import { capitalize } from '../../helpers/str';
import { colors } from '../../constants/constants';

const AppearanceSettingsScreen = () => {
    // Context
    const {
        setHideFeed,
        setFlavor,
        state: {
            flavor,
            hideFeed
        }
    } = useSettings();

    const settings = [
        {
            title: 'Dark Mode',
            type: 'button',
            onPress: () => {
                const message = `To set dark mode you must change your system theme${Platform.OS === 'ios' ? ' in settings under "Display & Brightness"' : ''}`;
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
            title: 'Flavor',
            type: 'dropdown',
            value: capitalize(flavor),
            color: colors.flavors[flavor].MAIN,
            options: Object.keys(colors.flavors).map(fl => {
                return {
                    label: capitalize(fl),
                    onSelect: () => setFlavor(fl)
                };
            })
        },
        {
            title: 'Hide Feed',
            type: 'toggle',
            value: hideFeed,
            setValue: setHideFeed,
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
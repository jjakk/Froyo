import React, { useContext } from 'react';
// Components
import { StyleSheet } from 'react-native';
import SettingsOptions from '../components/settings/SettingsList';;
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
// Context
import { Context as SettingsContext } from '../context/SettingsContext';
// Constants
import { colors } from '../constants/constants';

const SettingsScreen = ({ navigation }) => {
    const { setDarkModeEnable, state: { darkModeEnabled } } = useContext(SettingsContext);

    const settings = [
        {
            title: 'Dark Mode',
            type: 'toggle',
            value: darkModeEnabled,
            onChange: (newValue) => {
                setDarkModeEnable(newValue)
            }
        },
        {
            title: 'Delete Account',
            type: 'button',
            color: colors.DISLIKE_RED,
            onPress:() => {console.log('delete account');}
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


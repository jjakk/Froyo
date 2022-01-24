import React from 'react';
// Components
import {
    StyleSheet,
    FlatList
} from 'react-native';
import SettingsItem from './SettingsItem';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const SettingsList = ({ settings }) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';

    return (
        <FlatList
            data={settings}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item }) => (
                <SettingsItem item={item} />
            )}
            style={[
                styles.options,
                themeStyles[theme].options
            ]}
        />
    );
};

const styles = StyleSheet.create({
    options: {
        flex: 1,
    },
});

const themeStyles = {
    light: StyleSheet.create({
        options: {
            backgroundColor: colors.LIGHT_GREY
        }
    }),
    dark: StyleSheet.create({
        options: {
            backgroundColor: colors.dark.THIRD
        }
    })
};

export default SettingsList;
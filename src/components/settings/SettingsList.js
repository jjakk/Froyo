import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    FlatList
} from 'react-native';
import SettingsItem from './SettingsItem';
// Constants
import { colors } from '../../constants/constants';

const SettingsList = ({ settings }) => {
    const theme = Appearance.getColorScheme();

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
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        options: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default SettingsList;
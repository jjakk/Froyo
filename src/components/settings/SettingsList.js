import React from 'react';
// Components
import {
    StyleSheet,
    FlatList
} from 'react-native';
import SettingsItem from './SettingsItem';
// Constants
import { colors } from '../../constants/constants';

const SettingsList = () => {

    const settingOptions = [
        /*
        {
            title: 'Theme',
            type: 'dropdown',
            options: [

            ],
            onChange: () => {}
        },
        {
            title: 'Delete Account',
            type: 'button',
            color: colors.DISLIKE_RED,
            onPress:() => {console.log('delete account');}
        }
        */
    ];

    return (
        <FlatList
            data={settingOptions}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item }) => (
                <SettingsItem item={item} />
            )}
            style={styles.options}
        />
    );
};

const styles = StyleSheet.create({
    options: {
        flex: 1,
        backgroundColor: colors.LIGHT_GREY
    },
});

export default SettingsList;
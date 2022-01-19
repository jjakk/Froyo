import React from 'react';
// Components
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import { Text, Switch } from './froyo-elements';
// Constants
import { colors } from '../constants/constants';

const SettingsList = () => {

    const settingOptions = [
        /*
        {
            title: 'option 1',//'Theme',
            type: 'toggle'
        },
        {
            title: 'option 2'//'Delete Account'
        }
        */
    ];

    return (
        <FlatList
            data={settingOptions}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.settingOption}>
                    <Text style={styles.settingOptionText}>
                        {item.title}
                    </Text>
                    <Switch />
                </View>
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
    settingOption: {
        backgroundColor: colors.WHITE,
        padding: 10,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingOptionText: {
        fontSize: 20
    }
});

export default SettingsList;
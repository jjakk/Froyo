import React from 'react';
// Components
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Switch
} from '../froyo-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const SettingsItem = ({ item }) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    let RenderItem = () => (<></>);

    switch (item.type) {
        case 'toggle':
            RenderItem = () => (
                <>
                    <Text style={[
                        styles.optionText,
                        themeStyles[theme].optionText
                    ]}>
                        {item.title}
                    </Text>
                    <Switch
                        {...item}
                    />
                </>
            );
            break;
        case 'dropdown':
            RenderItem = () => (
                <>
                    <Text style={[
                        styles.optionText,
                        themeStyles[theme].optionText
                    ]}>
                        {item.title}
                    </Text>
                </>
            );
            break;
        case 'button':
            RenderItem = () => (
                <TouchableOpacity style={styles.button} onPress={item.onPress}>
                    <Text style={[
                        styles.optionText,
                        themeStyles[theme].optionText,
                        styles.buttonText, {
                            color: item.color,
                            fontSize: 22
                        }
                    ]}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            );
            break;
    }

    return (
        <View style={[
            styles.option,
            themeStyles[theme].option
        ]}>
            <RenderItem />
        </View>
    );
}

const styles = StyleSheet.create({
    option: {
        padding: 10,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 20
    },
    // Option types
    button: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Nunito-SemiBold',
    }
});

const themeStyles = {
    light: StyleSheet.create({
        option: {
            backgroundColor: colors.WHITE,
        },
        optionText: {
            color: colors.BLACK
        }
    }),
    dark: StyleSheet.create({
        option: {
            backgroundColor: colors.dark.SECOND,
        },
        optionText: {
            color: colors.WHITE
        }
    })
};

export default SettingsItem;
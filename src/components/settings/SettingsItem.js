import React from 'react';
// Components
import {
    Appearance,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Switch
} from '../froyo-elements';
// Constants
import { colors } from '../../constants/constants';

const SettingsItem = ({ item }) => {
    // Theme
    const theme = Appearance.getColorScheme();

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
                        styles.buttonText,
                        item.color ? { color: item.color } : {}
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
        padding: 15,
        marginBottom: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 22,
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
            color: colors.dark.SECOND
        }
    }),
    dark: StyleSheet.create({
        option: {
            backgroundColor: colors.dark.THIRD,
        },
        optionText: {
            color: colors.light.SECOND
        }
    })
};

export default SettingsItem;
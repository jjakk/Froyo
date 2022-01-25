import React from 'react';
// Components
import {
    TextInput,
    View,
    StyleSheet
} from 'react-native';
// Constants
import { colors } from '../../constants/constants';
// Context
import { useSettings } from '../../context/SettingsContext';

const Input = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    const { style, textStyle, icon } = props;

    return (
        <View style={[styles.container, style]}>
            {
                (icon ? (
                    <View style={styles.icon}>
                        {icon}
                    </View>
                ) : null)
            }
            <TextInput
                {...props}
                selectionColor={darkModeEnabled ? colors.DARK_GREY : colors.WHITE}
                style={[
                    styles.text,
                    themeStyles[theme].text,
                    textStyle
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.GREY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Nunito',
        fontSize: 20,
        flex: 1
    },
    icon: {
        marginRight: 10,
        opacity: 0.5
    }
});

const themeStyles = {
    light: StyleSheet.create({
        text: {
            color: colors.LIGHT_BLACK
        }
    }),
    dark: StyleSheet.create({
        text: {
            color: colors.LIGHT_GREY
        }
    })
};

export default Input;




import React from 'react';
import { StyleSheet } from 'react-native';
// Components
import { Text as DefaultText } from 'react-native-elements';
// Constants
import { colors } from '../../constants/constants';
// Context
import { useSettings } from '../../context/SettingsContext';

const Text = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    const { children } = props;

    return (
        <DefaultText
            {...props}
            style={[
                styles.text,
                themeStyles[theme].text,
                props.style
            ]}
        >
            {children}
        </DefaultText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Nunito',
        fontSize: 18
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
            color: colors.GREY
        }
    })
};

export default Text;



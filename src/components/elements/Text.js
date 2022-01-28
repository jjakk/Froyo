import React from 'react';
import { StyleSheet } from 'react-native';
// Components
import { Text as DefaultText } from 'react-native';
// Constants
import { colors } from '../../constants/constants';
// Context
import { useSettings } from '../../context/SettingsContext';

const Text = (props) => {
    const { state: { theme } } = useSettings();
    const {
        children,
        style
    } = props;

    return (
        <DefaultText
            {...props}
            style={[
                styles.text,
                themeStyles[theme].text,
                style
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
            color: colors.light.FOURTH
        }
    }),
    dark: StyleSheet.create({
        text: {
            color: colors.light.SECOND
        }
    })
};

export default Text;



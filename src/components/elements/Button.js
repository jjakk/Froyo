import React from 'react';
import { StyleSheet } from 'react-native';
// Components
import { Button as DefaultButton } from 'react-native-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const Button = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark';

    // Props
    const {
        buttonStyle,
        titleStyle,
        color=(
            darkModeEnabled
                ? colors.LIGHT_GREEN
                : colors.GREEN
        ),
        type,
        pill,
        disabled
    } = props;
    const textColor = type === 'secondary' ? color : (
        darkModeEnabled ? colors.light.FOURTH : colors.WHITE
    );

    return (
        <DefaultButton
            {...props}
            buttonStyle={[
                styles.button,
                {
                    backgroundColor: color,
                    borderColor: color,
                    borderRadius: pill ? 30 : 15,
                    opacity: disabled ? 0.5 : 1
                },
                typeStyles[type].button,
                buttonStyle
            ]}
            titleStyle={[
                styles.title,
                {
                    color: textColor
                },
                titleStyle
            ]}
            loadingProps={{
                color: textColor,
                size: 31
            }}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderWidth: 1
    },
    title: {
        fontFamily: 'Nunito',
        fontSize: 24
    }
});

const typeStyles = {
    primary: StyleSheet.create({
        button: {
            borderColor: 'transparent'
        }
    }),
    secondary: StyleSheet.create({
        button: {
            backgroundColor: 'transparent'
        }
    })
};

Button.defaultProps = {
    type: 'primary',
    pill: false
};

export default Button;

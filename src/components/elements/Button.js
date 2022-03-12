import React from 'react';
import {
    Appearance,
    StyleSheet
} from 'react-native';
// Components
import { Button as DefaultButton } from 'react-native-elements';
// Constants
import { colors } from '../../constants/constants';

const Button = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
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
        borderWidth: 2
    },
    title: {
        fontFamily: 'Nunito',
        fontSize: 22
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

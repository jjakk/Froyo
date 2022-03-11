import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
// Constants
import { colors } from '../../constants/constants';

const Input = (props) => {
    // Context
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        style,
        textStyle,
        icon
    } = props;

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            {
                (icon ? (
                    <View style={styles.icon}>
                        {icon}
                    </View>
                ) : null)
            }
            <TextInput
                {...props}
                selectionColor={darkModeEnabled ? colors.WHITE : colors.light.THIRD}
                placeholderTextColor={colors.light.THIRD}
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
        borderRadius: 15,
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
        container: {
            backgroundColor: colors.light.FIRST
        },
        text: {
            color: colors.light.FOURTH
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FIRST
        },
        text: {
            color: colors.light.FIRST
        }
    })
};

export default Input;




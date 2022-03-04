import React from 'react';
import { StyleSheet, View } from 'react-native';
// Component
import { Text, TouchableIcon } from '../froyo-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
// Icons
import CloseIcon from '../../../assets/icons/Close.svg';
// Constants
import { colors } from '../../constants/constants';

const ErrorMessage = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark';

    // Props
    const {
        error: message,
        setError: setMessage,
        style,
        type
    } = props;

    const onClear = () => {
        setMessage('');
    };

    if(message){
        return (
            (
                type === 'text' ? (
                    <Text
                        {...props}
                        style={[
                            styles.text,
                            themeStyles[theme].text,
                            style
                        ]}
                    >{message}</Text>
                ) : type === 'box' ? (
                    <View {...props} style={[
                        styles.box,
                        themeStyles[theme].box,
                        style
                    ]}>
                        <Text style={styles.boxText}>{message}</Text>
                        <TouchableIcon
                            Icon={CloseIcon}
                            size={20}
                            color={darkModeEnabled ? colors.light.SECOND : colors.dark.FIRST}
                            onPress={onClear}
                        />
                    </View>
                ) : null
            )
            
        );
    }
    else{
        return null
    }
};

const styles = StyleSheet.create({
    text: {
        opacity: 0.5,
        marginTop: 25,
        fontSize: 22,
        width: 300,
        textAlign: 'center',
        alignSelf: 'center'
    },
    box: {
        opacity: 0.9,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 35,
        borderWidth: 1
    },
    boxText: {
        fontSize: 24,
        marginRight: 15,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        text: {
            color: colors.ERROR_RED
        },
        box: {
            backgroundColor: colors.light.FIRST,
            borderColor: colors.light.SECOND
        }
    }),
    dark: StyleSheet.create({
        text: {
            color: colors.WHITE
        },
        box: {
            backgroundColor: colors.dark.SECOND,
            borderColor: colors.dark.FIRST
        }
    })
};

ErrorMessage.defaultProps = {
    type: 'text'
};

export default ErrorMessage;
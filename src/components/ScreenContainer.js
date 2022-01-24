import React, { useState } from 'react';
// Components
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    View,
    StatusBar
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorMessage from './messages/ErrorMessage';
// Context
import { useSettings } from '../context/SettingsContext';
// Constants
import { colors } from '../constants/constants';

const ScreenContainer = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';

    // Props
    const {
        children,
        style,
        onDidFocus,
        ...restOfProps
    } = props;

    // Error handling
    const [error, setError] = useState('');

    const clearError = () => {
        setError('');
    };

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            <SafeAreaView
                {...restOfProps}
                style={[
                    styles.container,
                    themeStyles[theme].container,
                    style
                ]}
            >
                <TouchableWithoutFeedback
                    style={[
                        styles.container,
                        themeStyles[theme].container,
                        style
                    ]}
                    onPress={Keyboard.dismiss}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
                        style={[
                            styles.container,
                            themeStyles[theme].container,
                            style
                        ]}
                    >
                        <NavigationEvents onDidFocus={onDidFocus} />
                        <StatusBar
                            backgroundColor={darkModeEnabled ? colors.WHITE : colors.BLACK}
                            barStyle={darkModeEnabled ? 'light-content' : 'dark-content'}
                        />
                        {children}
                        <ErrorMessage
                            type='box'
                            message={error}
                            clearError={clearError}
                            style={styles.error}
                        />
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        position: 'absolute',
        bottom: 0,
        margin: 25
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD
        }
    })
};

export default ScreenContainer;
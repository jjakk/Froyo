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
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        children,
        style,
        onDidFocus,
        statusBarBackgroundColor=(
            darkModeEnabled
                ? colors.dark.THIRD
                : colors.WHITE
        ),
        statusBarStyle=(
            darkModeEnabled
                ? 'light-content'
                : 'dark-content'
        ),
        ...restOfProps
    } = props;

    // Error handling
    const [error, setError] = useState('');

    return (
        <View style={[
            styles.container,
            themeStyles[theme].container,
            style
        ]}>
            <StatusBar
                backgroundColor={statusBarBackgroundColor}
                barStyle={statusBarStyle}
            />
            <SafeAreaView
                {...restOfProps}
                edges={['top']}
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
                        {children}
                        <ErrorMessage
                            type='box'
                            error={error}
                            setError={setError}
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
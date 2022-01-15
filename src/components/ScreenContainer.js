import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    View
} from 'react-native';
import ErrorMessage from './ErrorMessage';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = (props) => {
    // Props
    const {
        children,
        style,
        ...restOfProps
    } = props;

    // Error handling
    const [error, setError] = useState('');

    const clearError = () => {
        setError('');
    };

    return (
        <View style={[styles.container, style]}>
            <SafeAreaView
                {...restOfProps}
                style={[styles.container, style]}
            >
                <TouchableWithoutFeedback
                    style={styles.container}
                    onPress={Keyboard.dismiss}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
                        style={styles.container}
                    >
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
        flex: 1,
    },
    error: {
        position: 'absolute',
        bottom: 0,
        margin: 25
    }
});

export default ScreenContainer;
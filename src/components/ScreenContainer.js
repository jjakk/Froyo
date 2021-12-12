import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = (props) => {
    const {
        children,
        style
    } = props;

    return (
        <SafeAreaView
            style={[styles.container, style]}
            edges={['top']}
        >
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    {children}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ScreenContainer;
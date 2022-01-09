import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = (props) => {
    const {
        children,
        style,
        ...restOfProps
    } = props;

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
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default ScreenContainer;
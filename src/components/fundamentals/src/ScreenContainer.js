import React from "react";
// Components
import {
    Appearance,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    View,
    StatusBar
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
// Constants
import { colors } from "@froyo/constants";

const ScreenContainer = (props) => {
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark" ;

    // Props
    const {
        children,
        style,
        onDidFocus,
        onWillBlur,
        statusBarBackgroundColor=(
            darkModeEnabled
                ? colors.dark.THIRD
                : colors.WHITE
        ),
        statusBarStyle=(
            darkModeEnabled
                ? "light-content"
                : "dark-content"
        ),
        ...restOfProps
    } = props;

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
                edges={["top"]}
                style={[
                    styles.container,
                    themeStyles[theme].container,
                    style
                ]}
                {...restOfProps}
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
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
                        style={[
                            styles.container,
                            themeStyles[theme].container,
                            style
                        ]}
                    >
                        <NavigationEvents
                            onDidFocus={onDidFocus}
                            onWillBlur={onWillBlur}
                        />
                        {children}
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
        position: "absolute",
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
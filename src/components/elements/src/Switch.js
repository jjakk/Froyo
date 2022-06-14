import React, { useRef } from "react";
// Components
import {
    Appearance,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback
} from "react-native";
// Context
import { useSettings } from "@froyo/settings-context";
// Constants
import { colors } from "@froyo/constants";

const Switch = (props) => {
    // Context
    const { state: { primaryColors } } = useSettings();

    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === "dark" ;

    // Props
    const {
        value: isOn,
        setValue,
        style,
    } = props;

    // Animation Logic
    const progress = useRef(new Animated.Value(Number(isOn))).current;

    // Conditional rendering
    const backgroundColor = darkModeEnabled ? {
        on: colors.light.FIRST,
        off: colors.dark.FIRST
    } : {
        on: primaryColors.MAIN,
        off: colors.light.SECOND
    };

    const circleColor = darkModeEnabled ? {
        on: colors.dark.FIRST,
        off: colors.light.FIRST
    } : {
        on: colors.WHITE,
        off: colors.WHITE
    };

    // Event handlers
    const onPress = () => {
        Animated.timing(progress, {
            toValue: Number(!isOn),
            duration: 150,
            useNativeDriver: false
        }).start(() => {
            progress.setValue(0);
            setValue(!isOn);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={[styles.switch, {
                backgroundColor: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [backgroundColor.off, backgroundColor.on]
                })
            }, style]}>
                <Animated.View style={[styles.circle, {
                    backgroundColor: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [circleColor.off, circleColor.on]
                    }),
                    transform: [{
                        translateX: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 28]
                        })
                    }]
                }]} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    switch: {
        width: 64,
        height: 36,
        padding: 4,
        borderRadius: 999,
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 999,
    },
});

Switch.defaultProps = {
    value: false
};

export default Switch;
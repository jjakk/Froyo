import React, { useRef } from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
// Constants
import { colors } from '../../constants/constants';

const Switch = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        value: isOn,
        onToggle,
        style,
    } = props;

    // Animation Logic
    const progress = useRef(new Animated.Value(Number(isOn))).current;

    // Conditional rendering
    const backgroundColor = (
        isOn ? (
            darkModeEnabled
                ? colors.primary.LIGHT
                : colors.primary.MAIN
        ) : (
            colors.light.SECOND
        )
    );
    const circleColor = (
        darkModeEnabled
            ? colors.dark.FIRST
            : colors.WHITE
    );

    // Event handlers
    const onPress = () => {
        Animated.timing(progress, {
            toValue: Number(!isOn),
            duration: 150,
            useNativeDriver: true
        }).start(() => {
            progress.setValue(0);
        });
        onToggle();
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.switch, {
                backgroundColor: backgroundColor
            }, style]}>
                <Animated.View style={[styles.circle, {
                    backgroundColor: circleColor,
                    transform: [{
                        translateX: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 28]
                        })
                    }]
                }]} />
            </View>
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
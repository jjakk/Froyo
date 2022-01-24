import React from 'react';
// Components
import {
    StyleSheet,
    View,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const Switch = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const {
        value: isOn,
        onToggle,
        style,
    } = props;

    return (
        <TouchableWithoutFeedback onPress={onToggle}>
            <View style={[styles.switch, {
                backgroundColor: darkModeEnabled ? (
                    isOn ? colors.LIGHT_GREY : colors.dark.FIRST
                ) : (
                    isOn ? colors.GREEN : colors.LIGHT_GREY
                )
            }, style]}>
                <Animated.View style={[styles.circle, {
                    backgroundColor: darkModeEnabled ? (
                        isOn ? colors.dark.FIRST : colors.LIGHT_GREY
                    ) : (
                        isOn ? colors.LIGHT_GREY : colors.GREEN
                    ),
                    transform: [{
                        translateX: isOn ? 28 : 0,
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
        padding: 5,
        borderRadius: 999,
    },
    circle: {
        width: 26,
        height: 26,
        borderRadius: 999,
    },
});

Switch.defaultProps = {
    value: false
};

export default Switch;
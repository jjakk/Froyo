import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../constants/constants';

const Switch = (props) => {
    const {
        value,
        onValueChange,
        style,
    } = props;
    const [isOn, setIsOn] = useState(value);

    const onPress = () => {
        onValueChange(!isOn);
        setIsOn(!isOn);
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.switch, {
                backgroundColor: isOn ?  colors.LIGHT_GREY : colors.GREEN
            }, style]}>
                <Animated.View style={[styles.circle, {
                    backgroundColor: isOn ? colors.GREEN : colors.LIGHT_GREY,
                    transform: [{
                        translateX: isOn ? 0 : 28,
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
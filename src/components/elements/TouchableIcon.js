import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const TouchableIcon = (props) => {
    const {
        Icon,
        size,
        color,
        style,
        onPress
    } = props;
    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.touchableArea, style]}>
            <Icon
                width={size}
                height={size}
                color={color}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableArea: {
        alignSelf: 'flex-start'
    }
});

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black'
};

export default TouchableIcon;

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
        <TouchableOpacity onPress={onPress}>
            <Icon
                width={size}
                height={size}
                color={color}
                style={style}
            />
        </TouchableOpacity>
    );
};

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black',
};

export default TouchableIcon;

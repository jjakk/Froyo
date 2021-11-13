import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableIcon = (props) => {
    const {
        Icon,
        size,
        color,
        style,
        onPress
    } = props;
    
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Icon
                width={size}
                height={size}
                color={color}
            />
        </TouchableOpacity>
    );
};

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black'
};

export default TouchableIcon;

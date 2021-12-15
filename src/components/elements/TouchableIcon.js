import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableIcon = (props) => {
    const {
        Icon,
        size,
        color,
        style,
        onPress,
        TouchableComponent
    } = props;
    
    const Touchable = TouchableComponent || TouchableOpacity;
    
    return (
        <Touchable onPress={onPress}>
            <Icon
                width={size}
                height={size}
                color={color}
                style={style}
            />
        </Touchable>
    );
};

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black',
};

export default TouchableIcon;
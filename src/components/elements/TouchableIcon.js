import React from 'react';
import { TouchableOpacity } from 'react-native';
import LoadingAnimation from './LoadingAnimation';
import { colors } from '../../constants/constants';

const TouchableIcon = (props) => {
    const {
        Icon,
        size,
        color,
        style,
        onPress,
        loading,
        TouchableComponent
    } = props;
    
    const Touchable = TouchableComponent || TouchableOpacity;
    
    return (
        !loading ? (
            <Touchable onPress={onPress}>
            <Icon
                width={size}
                height={size}
                color={color}
                style={style}
            />
        </Touchable>
        ) : (
            <LoadingAnimation/>
        )
    );
};

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black',
};

export default TouchableIcon;
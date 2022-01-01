import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../constants/constants';
import * as Progress from 'react-native-progress';

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
            <Progress.CircleSnail
                size={50}
                indeterminate={true}
                spinDuration={1000}
                color={colors.FROYO_GREEN}
            />
        )
    );
};

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black',
};

export default TouchableIcon;
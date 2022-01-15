import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LoadingAnimation from './LoadingAnimation';

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
            <LoadingAnimation
                style={styles.loading}
                size={size}
                style={style}
            />
        )
    );
};

const styles = StyleSheet.create({
    loading: {
        alignSelf: 'center',
    }
});

TouchableIcon.defaultProps = {
    size: 25,
    color: 'black',
};

export default TouchableIcon;
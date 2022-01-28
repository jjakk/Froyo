import React from 'react';
// Components
import { TouchableOpacity, StyleSheet } from 'react-native';
import LoadingAnimation from './LoadingAnimation';
// Context
import { useSettings } from '../../context/SettingsContext';

const TouchableIcon = (props) => {
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark' ;
    const {
        Icon,
        size,
        color=(darkModeEnabled
            ? colors.GREY
            : colors.DARK_BLACK
        ),
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
};

export default TouchableIcon;
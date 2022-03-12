import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import LoadingAnimation from './LoadingAnimation';
// Constants
import { colors } from '../../constants/constants';

const TouchableIcon = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Props
    const {
        Icon,
        size,
        color=(darkModeEnabled
            ? colors.light.THIRD
            : colors.light.FOURTH
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
                style={[styles.loading, style]}
                size={size}
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
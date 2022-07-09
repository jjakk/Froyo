import React from "react";
// Components
import {
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { LoadingAnimation } from "@froyo/animations";
// Constants
import { colors } from "@froyo/constants";

const TouchableIcon = (props) => {
    // Props
    const {
        Icon,
        size,
        color=colors.light.THIRD,
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
        alignSelf: "center",
    }
});

TouchableIcon.defaultProps = {
    size: 25,
};

export default TouchableIcon;
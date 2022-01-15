import React, { useRef, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView, Easing } from "react-native";
// Icons
import LoadingIcon from '../../../assets/animation-icons/loading.svg';
// Constants
import { colors } from '../../constants/constants';

const LoadingAnimation = (props) => {
    const spinAnimation = useRef(new Animated.Value(0)).current;
    const {
        size,
        color,
        style
    } = props;

  useEffect(() => {
    Animated.loop(
        Animated.timing(
            spinAnimation,
            {
                toValue: 1,
                duration: 750,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();
  }, [spinAnimation]);

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <Animated.View
        style={[style , {
            ...styles.loading,
            transform: [{ rotate: spin }]
        }]}
    >
        <LoadingIcon
            width={size}
            height={size}
            color={color}
        />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    loading: {
        height: 50,
        width: 50,
    }
});

LoadingAnimation.defaultProps = {
    size: 50,
    color: colors.FROYO_GREEN_LIGHTER
};

export default LoadingAnimation;

import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Easing } from "react-native";
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

  const styles = StyleSheet.create({
        loading: {
            height: size,
            width: size,
        }
    });

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

LoadingAnimation.defaultProps = {
    size: 50,
    color: colors.GREEN_LIGHTER
};

export default LoadingAnimation;

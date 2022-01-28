import React, {
    useRef,
    useEffect
} from "react";
import {
    Animated,
    StyleSheet,
    Easing
} from "react-native";
// Context
import { useSettings } from '../../context/SettingsContext';
// Icons
import LoadingIcon from '../../../assets/animation-icons/loading.svg';
// Constants
import { colors } from '../../constants/constants';

const LoadingAnimation = (props) => {
    // Context
    const { state: { theme } } = useSettings();
    const darkModeEnabled = theme === 'dark';

    // Refs
    const spinAnimation = useRef(new Animated.Value(0)).current;

    // Props
    const {
        size=50,
        color=(
            darkModeEnabled ? 
                colors.DARKER_GREEN
                : colors.LIGHTER_GREEN
        ),
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

export default LoadingAnimation;

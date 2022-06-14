import React, {
    useRef,
    useImperativeHandle,
    forwardRef
} from "react";
import {
    Animated,
    StyleSheet
} from "react-native";
// Icons
import { LikeIconFill } from "@froyo/icons";
// Constants
import { colors } from "@froyo/constants";

const LikeAnimation = (props, ref) => {
    // Refs
    const progress = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
        fire
    }))

    const fire = () => {
        // Fire like animations
        Animated.sequence([
            Animated.parallel([
                Animated.spring(progress, {
                    toValue: 1,
                    speed: 2,
                    useNativeDriver: true
                }),
                Animated.spring(opacity, {
                    toValue: 1,
                    speed: 2,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(opacity, {
                toValue: 0,
                speed: 2,
                useNativeDriver: true
            })
        ]).start(() => {
            progress.setValue(0);
            opacity.setValue(0);
        });
    };

    const {
        style
    } = props;

    return (
        <Animated.View style={[
            style,
            {
                transform: [
                    {
                        scale: progress.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0, 0.5, 1]
                        })
                    },
                    {
                        rotate: progress.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: ["0deg", "30deg", "0deg"]
                        })
                    }
                ],
                opacity: opacity.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0, 1]
                })
            }
        ]}>
            <LikeIconFill
                color={colors.GREEN}
                width={100}
                height={100}
                style={[
                    styles.icon
                ]}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    icon: {
        shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0.25,
          shadowRadius: 15
    }
});

export default forwardRef(LikeAnimation);

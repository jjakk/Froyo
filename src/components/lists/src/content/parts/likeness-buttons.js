import React, {
    useRef,
    useImperativeHandle,
    forwardRef
} from "react";
import { Animated } from "react-native";
// Components
import { TouchableIcon } from "@froyo/elements";
// Icons
import {
    LikeIconFill,
    DislikeIconFill,
    LikeIconOutline,
    DislikeIconOutline
} from "@froyo/icons";
// Constants
import { colors } from "@froyo/constants";

const LikenessButton = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        simulateTap: handlePress
    }))

    // Props
    const {
        onPress,
        style,
        size,
        fillColor,
        FillIcon,
        OutlineIcon,
        fillCondition,
        rotateClockwise,
    } = props;

    // Determines whether to rotate clockwise or counterclockwise
    const maxRotation = 30 * (
        (-1) ** Number(fillCondition !== rotateClockwise)
    );

    // Animation Logic
    const progress = useRef(new Animated.Value(0)).current;

    // Press logic
    const handlePress = () => {
        // Fire animations
        Animated.spring(progress, {
            toValue: 1,
            speed: 1.25,
            useNativeDriver: true
        })
        .start(() => {
            progress.setValue(0);
        });
        // Fire onPress prop function
        onPress();
    };

    // Conditional props
    const Icon = fillCondition ? FillIcon : OutlineIcon;
    const buttonColor = fillCondition
        ? fillColor
        : undefined

    return (
        <Animated.View
            style={{
                transform: [{
                    rotate: progress.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [
                            "0deg",
                            `${maxRotation}deg`,
                            "0deg"
                        ]
                    })
                    
                }, {
                    scale: progress.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [1, 1.1, 1]
                    })
                }],
                opacity: progress.interpolate({
                    inputRange: [0, 0.1, 1],
                    outputRange: [1, 0, 1]
                })
            }}
        >
            <TouchableIcon
                onPress={handlePress}
                Icon={Icon}
                color={buttonColor}
                style={style}
                size={size}
            />
        </Animated.View>
    );
});

const LikeButton = (props, ref) => {
    // Refs
    const likenessRef = useRef();
    useImperativeHandle(ref, () => ({
        simulateTap: likenessRef.current.simulateTap
    }))

    // Props
    const {
        content
    } = props;

    return (
        <LikenessButton
            {...props}
            fillCondition={content.liking}
            fillColor={colors.GREEN}
            FillIcon={LikeIconFill}
            OutlineIcon={LikeIconOutline}
            rotateClockwise={false}
            ref={likenessRef}
        />
    );
};

const DislikeButton = (props, ref) => {
    // Refs
    const likenessRef = useRef();
    useImperativeHandle(ref, () => ({
        simulateTap: likenessRef.current.simulateTap
    }))

    // Props
    const {
        content
    } = props;
    
    return (
        <LikenessButton
            {...props}
            fillCondition={content.disliking}
            fillColor={colors.DISLIKE_RED}
            FillIcon={DislikeIconFill}
            OutlineIcon={DislikeIconOutline}
            rotateClockwise={true}
            ref={likenessRef}
        />
    );
};

module.exports = {
    LikeButton: forwardRef(LikeButton),
    DislikeButton: forwardRef(DislikeButton)
};

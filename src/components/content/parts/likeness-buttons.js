import React, {
    useRef,
    useImperativeHandle,
    forwardRef
} from 'react';
import { Animated } from 'react-native';
// Components
import TouchableIcon from '../../elements/TouchableIcon';
// Icons
import LikeIconFill from '../../../../assets/icons/Like-Fill.svg';
import DislikeIconFill from '../../../../assets/icons/Dislike-Fill.svg';
import LikeIconOutline from '../../../../assets/icons/Like-Outline.svg';
import DislikeIconOutline from '../../../../assets/icons/Dislike-Outline.svg';
// Constants
import { colors, sizes } from '../../../constants/constants';

const LikenessButton = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        simulateTap: handlePress
    }))

    // Props
    const {
        onPress,
        style,
        fillColor,
        FillIcon,
        OutlineIcon,
        fillCondition,
        rotateClockwise,
    } = props;

    // Determines whether to rotate clockwise or counterclockwise
    const maxRotation = 45 * (
        (-1) ** Number(fillCondition !== rotateClockwise)
    );

    // Animation Logic
    const progress = {
        timing: useRef(new Animated.Value(0)).current,
        spring: useRef(new Animated.Value(0)).current
    };

    // Press logic
    const handlePress = () => {
        // Fire animations
        Animated.parallel([
            Animated.spring(progress.spring, {
                toValue: 1,
                speed: 2,
                useNativeDriver: true
            }),
            Animated.timing(progress.timing, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ])
        .start(() => {
            progress.spring.setValue(0);
            progress.timing.setValue(0);
        });
        // Fire onPress prop function
        onPress();
    };

    // Conditional props
    const Icon = fillCondition ? FillIcon : OutlineIcon;
    const rotation = progress.spring.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
            '0deg',
            `${maxRotation}deg`,
            '0deg'
        ]
    });
    const colorCycle = progress.timing.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(90,210,244)" , "rgb(224,82,99)"]
    });
    const buttonColor = fillCondition
        ? fillColor//colorCycle
        : undefined

    return (
        <Animated.View
            style={{
                transform: [{
                    rotate: rotation
                }]
            }}
        >
            <TouchableIcon
                size={sizes.ACTION_ICON}
                onPress={handlePress}
                Icon={Icon}
                color={buttonColor}
                style={style}
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
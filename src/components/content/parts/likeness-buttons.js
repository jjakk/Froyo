import React, { useRef } from 'react';
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

const LikenessButton = (props) => {
    // Props
    const {
        content,
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
    const progress = useRef(new Animated.Value(0)).current;

    // Press logic
    const handlePress = () => {
        Animated.spring(progress, {
            toValue: 1,
            speed: 2,
            useNativeDriver: true
        }).start(() => {
            progress.setValue(0);
        });
        onPress();
    };

    return (
        <Animated.View
            style={{
                transform: [{
                    rotate: progress.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [
                            '0deg',
                            `${maxRotation}deg`,
                            '0deg'
                        ]
                    })
                }]
            }}
        >
            <TouchableIcon
                size={sizes.ACTION_ICON}
                style={style}
                onPress={handlePress}
                Icon={
                    fillCondition
                    ? FillIcon : OutlineIcon
                }
                color={
                    fillCondition
                    ? fillColor
                    : undefined
                }
            />
        </Animated.View>
    );
};

const LikeButton = (props) => {
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
        />
    );
};

const DislikeButton = (props) => {
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
        />
    );
};

module.exports = {
    LikeButton,
    DislikeButton
};

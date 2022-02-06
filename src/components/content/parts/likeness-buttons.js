import React from 'react';
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
    const {
        onPress,
        style,
        fillColor,
        FillIcon,
        OutlineIcon,
        fillCondition
    } = props;

    return (
        <TouchableIcon
            size={sizes.ACTION_ICON}
            style={style}
            onPress={onPress}
            Icon={
                fillCondition
                ? FillIcon : OutlineIcon
            }
            color={
                fillCondition
                ? fillColor : undefined
            }
        />
    );
};

const LikeButton = (props) => {
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
        />
    );
};

const DislikeButton = (props) => {
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
        />
    );
};

module.exports = {
    LikeButton,
    DislikeButton
};

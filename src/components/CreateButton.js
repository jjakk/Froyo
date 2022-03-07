import React from 'react';
import { TouchableIcon } from './froyo-elements';
import CreateIcon from '../../assets/icons/Create.svg';

const CreateButton = (props) => {
    // Props
    const {
        onPress,
        style,
    } = props;

    return (
        <TouchableIcon
            Icon={CreateIcon}
            onPress={onPress}
            size={75}
            style={style}
        />
    );
};

export default CreateButton;
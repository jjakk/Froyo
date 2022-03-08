import React from 'react';
// Components
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableIcon } from './froyo-elements';
// Icons
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
            TouchableComponent={TouchableWithoutFeedback}
            onPress={onPress}
            size={75}
            style={style}
        />
    );
};

export default CreateButton;
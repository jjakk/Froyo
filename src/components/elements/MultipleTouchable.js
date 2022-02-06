import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

const MultipleTouchable = (props) => {
    // Props
    const {
        children,
        onDoubleTap
    } = props;

    // State
    const [secondPress, setSecondPress] = useState(0);
    
    const onPress = () => {
        let delta = new Date().getTime() - secondPress;

        if (delta < 500) {
            onDoubleTap();
        }
    
        setSecondPress(new Date().getTime());
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export default MultipleTouchable;

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
    const [thirdPress, setThirdPress] = useState(0);
    
    const onPress = () => {
        let doubleDelta = new Date().getTime() - secondPress;
        let tripleDelta = new Date().getTime() - thirdPress;
    
        if (doubleDelta < 500) {
            onDoubleTap();
        }
    
        setSecondPress(new Date().getTime());
        setThirdPress(new Date().getTime());
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export default MultipleTouchable;

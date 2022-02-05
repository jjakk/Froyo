import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

const MultipleTouchable = (props) => {
    // Props
    const {
        children,
        onDoubleTap
    } = props;

    // State
    const [lastPress, setLastPress] = useState(0);
    
    const onPress = () => {
        let delta = new Date().getTime() - lastPress;
    
        if(delta < 500) {
            onDoubleTap();
        }
    
        setLastPress(new Date().getTime());
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export default MultipleTouchable;

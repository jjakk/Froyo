import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

const TouchableIcon = (props) => {
    const {
        icon,
        size,
        color,
        style
    } = props;
    
    return (
        <TouchableWithoutFeedback style={[styles.container, style]}>
            {icon}
        </TouchableWithoutFeedback>
    );
};

TouchableIcon.defaultProps = {
    size: 25,
    color: '#000'
};

const styles = StyleSheet.create({
    container: {
        padding: 5
    }
});

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';


const Link = (props) => {
    const {
        children,
        style,
        color
    } = props;
    
    const styles = StyleSheet.create({
        text: {
            color
        }
    });

    return(
        <TouchableOpacity {...props}>
            <Text style={[styles.text, style]}>{children}</Text>
        </TouchableOpacity>
    );
};

export default Link;

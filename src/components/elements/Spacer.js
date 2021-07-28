import React from 'react';
import { View, StyleSheet } from 'react-native';

const defaultPadding = 15;

const Spacer = ({ children, space }) => {
    return (
        <View style={{margin: space}}>
            {children}
        </View>
    );
};

Spacer.defaultProps = {
    space: 15
};

export default Spacer;


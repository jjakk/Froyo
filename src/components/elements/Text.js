import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as DefaultText } from 'react-native-elements';

const Text = (props) => {
    const { children } = props;
    return (<DefaultText {...props} style={[styles.text, props.style]}>{children}</DefaultText>);
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Nunito',
        fontSize: 18
    }
});

export default Text;



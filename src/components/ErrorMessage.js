import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './froyo-elements'; 

const ErrorMessage = (props) => {
    const { message, style } = props; 
    if(message){
        return (
            <Text {...props} style={[styles.error, style]}>{message}</Text>
        );
    }
    else{
        return null
    }
};

const styles = StyleSheet.create({
    error: {
        color: '#FB1C1C',
        opacity: 0.5,
        marginTop: 25,
        fontSize: 22,
        width: 300,
        textAlign: 'center',
        alignSelf: 'center'
    }
});

export default ErrorMessage;
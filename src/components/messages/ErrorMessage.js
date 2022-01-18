import React from 'react';
import { StyleSheet, View } from 'react-native';
// Component
import { Text, TouchableIcon } from '../froyo-elements';
// Icons
import CloseIcon from '../../../assets/icons/Close.svg';
// Constants
import { colors } from '../../constants/constants';

const ErrorMessage = (props) => {
    const {
        message,
        style,
        type,
        clearError
    } = props;

    if(message){
        return (
            (
                type === 'text' ? (
                    <Text {...props} style={[styles.text, style]}>{message}</Text>
                ) : type === 'box' ? (
                    <View {...props} style={[styles.box, style]}>
                        <Text style={styles.boxText}>{message}</Text>
                        <TouchableIcon
                            Icon={CloseIcon}
                            size={20}
                            onPress={clearError}
                        />
                    </View>
                ) : null
            )
            
        );
    }
    else{
        return null
    }
};

const styles = StyleSheet.create({
    text: {
        color: '#FB1C1C',
        opacity: 0.5,
        marginTop: 25,
        fontSize: 22,
        width: 300,
        textAlign: 'center',
        alignSelf: 'center'
    },
    box: {
        backgroundColor: 'white',
        opacity: 0.9,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderColor: colors.GREY,
        borderWidth: 2,
    },
    boxText: {
        fontSize: 24,
        marginRight: 15,
    }
});

ErrorMessage.defaultProps = {
    type: 'text'
};

export default ErrorMessage;
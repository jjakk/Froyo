import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = (props) => {
    const { style, textStyle, icon } = props;

    return (
        <View style={[styles.container, style]}>
            {
                (icon ? (
                    <View style={styles.icon}>
                        {icon}
                    </View>
                ) : null)
            }
            <TextInput {...props} style={[styles.text, textStyle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#404040',
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'Nunito',
        fontSize: 20,
        flex: 1
    },
    icon: {
        marginRight: 10,
        opacity: 0.5
    }
});

export default Input;




import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {  Input, Button, Text } from './../../components/froyo-elements';

const ResetPasswordScreen = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.header} >Reset Password</Text>
                    <Input style={styles.input} placeholder='Email' />
                    <Button
                        buttonStyle={styles.submit}
                        title='Reset Password'
                        type='primary'
                        color='#41CA99'
                        textColor='white'
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

ResetPasswordScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        paddingBottom: 100,
        alignItems: 'center',
    },
    header: {
        fontSize: 36,
        marginBottom: 10,
    },
    input: {
        width: 300,
        margin: 20
    },
    submit: {
        width: 300,
        margin: 20
    }
});

export default ResetPasswordScreen;
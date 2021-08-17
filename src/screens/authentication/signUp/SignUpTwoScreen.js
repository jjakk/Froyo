import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Text,
    Input,
    Button
} from '../../../components/froyo-elements';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const SignUpTwoScreen = ({ navigation }) => {
    // Form params from previous screen
    const email = navigation.getParam('email');
    const username = navigation.getParam('username');
    const dob = navigation.getParam('dob');
    // This screen's form params
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // Context values & functions
    const { signUp, clearErrorMessage, state: { errorMessage } } = useContext(AuthContext);

    const handleSubmit = () => {
        signUp({ email, username, dob, firstName, lastName, password, passwordConfirm });
    };

    return (
        <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => {
                                clearErrorMessage();
                                navigation.navigate('SignUpOne')
                            }}
                        >
                            <Ionicons name="arrow-back" size={52} color="black" />
                        </TouchableOpacity>
                        <View style={styles.auth}>
                            <Text style={styles.header}>Sign up</Text>
                            <Input style={styles.input} placeholder='First name' onChangeText={setFirstName} />
                            <Input style={styles.input} placeholder='Last name' onChangeText={setLastName} />
                            <Input style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry />
                            <Input style={styles.input} placeholder='Confirm Password' onChangeText={setPasswordConfirm} secureTextEntry />
                            <Button
                                title='Sign up'
                                color='#41CA99'
                                textColor='white'
                                type='primary'
                                buttonStyle={styles.submit}
                                containerStyle={styles.submitContainer}
                                onPress={handleSubmit}
                            />
                            {
                                errorMessage !== ''
                                    ? <Text style={styles.error}>{errorMessage}</Text>
                                    : null
                            }
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

SignUpTwoScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    auth: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        paddingBottom: 250
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    input: {
        width: 300,
        margin: 10
    },
    submit: {
        width: 300
    },
    submitContainer: {
        margin: 10
    },
    error: {
        color: '#FB1C1C',
        opacity: 0.5,
        marginTop: 25,
        fontSize: 22,
        width: 300,
        textAlign: 'center'
    },

    back: {
        margin: 15
    }
});

export default SignUpTwoScreen;


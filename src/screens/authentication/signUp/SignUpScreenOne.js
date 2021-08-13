import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from 'react-native';
import {
    Text,
    Input,
    Link,
    Spacer,
    Button
} from '../../../components/froyo-elements';
import { Context as AuthContext } from '../../../context/AuthContext';

const SignUpScreenOne = ({ navigation }) => {
    const { signUp, clearErrorMessage, state: { errorMessage } } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.auth}>
                    <Text style={styles.header}>Sign up</Text>
                    <Input
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input
                        style={styles.input}
                        placeholder='Username'
                        onChangeText={setUsername}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input style={styles.input} placeholder='Date of birth' onChangeText={setDateOfBirth} />
                    <Button
                        title='Continue'
                        color='#41CA99'
                        textColor='white'
                        type='primary'
                        buttonStyle={styles.submit}
                        containerStyle={styles.submitContainer}
                        onPress={() => {
                            clearErrorMessage();
                            navigation.navigate('SignUpTwo')
                        }}
                    />
                    <View style={styles.bottomText}>
                        <Text>Already have an account?</Text>
                        <Link
                            color='#41CA99'
                            onPress={() => {
                                clearErrorMessage();
                                navigation.navigate('SignIn')
                            }}
                        >
                            Sign in
                        </Link>
                        {
                            errorMessage !== ''
                                ? <Text style={styles.error}>{errorMessage}</Text>
                                : null
                        }
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

SignUpScreenOne.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    auth: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    input: {
        width: 300,
        margin: 10,
    },
    submit: {
        width: 300,
    },
    submitContainer: {
        margin: 10
    },
    bottomText: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: '#FB1C1C',
        opacity: 0.5,
        marginTop: 25,
        fontSize: 22,
        width: 300,
        textAlign: 'center'
    }
});

export default SignUpScreenOne;


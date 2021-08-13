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
            <View style={styles.container}>
                <SafeAreaView>
                    <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
                </SafeAreaView>
                <View style={styles.auth}>
                    <Text style={styles.header}>Sign up</Text>
                    <Spacer>
                        <Input style={styles.input} placeholder='Email' onChangeText={setEmail} />
                    </Spacer>
                    <Spacer>
                        <Input style={styles.input} placeholder='Username' onChangeText={setUsername} />
                    </Spacer>
                    <Spacer>
                        <Input style={styles.input} placeholder='Date of birth' onChangeText={setDateOfBirth} />
                    </Spacer>
                    <Spacer>
                        <Button
                            title='Continue'
                            color='#41CA99'
                            textColor='white'
                            type='primary'
                            buttonStyle={styles.submit}
                            onPress={() => {
                                clearErrorMessage();
                                navigation.navigate('SignUpTwo')
                            }}
                        />
                    </Spacer>
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
    },
    submit: {
        width: 300
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

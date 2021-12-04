import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {
    Button,
    Text,
    Input,
    Link
} from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';
import ErrorMessage from '../../components/ErrorMessage';

const SignInScreen = ({ navigation }) => {
    const { signIn, clearErrorMessage, state: { errorMessage } } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        clearErrorMessage();
        Keyboard.dismiss()
        setLoading(true);
        signIn({ email, password }, (success) => {
            setLoading(false);
            if(success) navigation.navigate('mainFlow');
        });
    };  

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <SafeAreaView>
                    <StatusBar backgroundColor='#F2F2F2' barStyle='dark-content' />
                </SafeAreaView>
                <View style={styles.auth}>
                    <Text style={styles.header}>Sign in</Text>
                    <Input
                        style={styles.input}
                        placeholder='Email'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={setEmail}
                    />
                    <View>
                        <Input style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry />
                        <Link color='#41CA99' style={styles.forgotPassword} onPress={() => navigation.navigate('ResetPassword')}>Forgot password?</Link>
                    </View>
                    <Button
                        title='Sign in'
                        color='#41CA99'
                        textColor='white'
                        type='primary'
                        loading={loading}
                        buttonStyle={styles.submit}
                        containerStyle={styles.submitContainer}
                        onPress={handleSubmit}
                    />
                    <View style={styles.bottomText}>
                        <Text style={{fontSize: 18}}>Don't have an account?</Text>
                        <Link
                            color='#41CA99'
                            onPress={() => {
                                clearErrorMessage();
                                navigation.navigate('SignUp')
                            }}
                        >
                            Sign up
                        </Link>
                        <ErrorMessage message={errorMessage} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

SignInScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    submit: {
        width: 300
    },
    submitContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    forgotPassword: {
        marginBottom: 5
    },
    input: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    bottomText: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignInScreen;


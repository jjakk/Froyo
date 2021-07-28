import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import Link from '../../components/Link';

const SignInScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
            </SafeAreaView>
            <View style={styles.auth}>
                <Text style={styles.header}>Sign in</Text>
                <Spacer>
                    <Input style={styles.input} placeholder='Email' />
                </Spacer>
                <Spacer>
                    <Input style={styles.input} placeholder='Password' secureTextEntry />
                    <Link color='#41CA99' style={styles.forgotPassword}>Forgot password?</Link>
                </Spacer>
                <Spacer>
                    <Button
                        title='Sign in'
                        color='#41CA99'
                        textColor='white'
                        type='primary'
                        buttonStyle={styles.submit}
                    />
                </Spacer>
                <Text style={{fontSize: 18}}>Don't have an account?</Text>
                <Link color='#41CA99' onPress={() => navigation.navigate('SignUp')}>Sign up</Link>
            </View>
        </View>
    );
};

SignInScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    auth: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    submit: {
        width: 300
    },
    forgotPassword: {
        marginTop: 5
    },
    input: {
        width: 300,
    }
});

export default SignInScreen;


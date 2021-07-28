import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, Input, Link, Spacer } from '../../components/froyo-elements';

const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
            </SafeAreaView>
            <View style={styles.auth}>
                <Text style={styles.header}>Sign up</Text>
                <Spacer>
                    <Input style={styles.input} placeholder='Email' />
                </Spacer>
                <Spacer>
                    <Input style={styles.input} placeholder='Password' secureTextEntry />
                </Spacer>
                <Spacer>
                    <Input style={styles.input} placeholder='Confirm Password' secureTextEntry />
                </Spacer>
                <Spacer>
                    <Button
                        title='Sign up'
                        color='#41CA99'
                        textColor='white'
                        type='primary'
                        buttonStyle={styles.submit}
                    />
                </Spacer>
                <Text>Already have an account?</Text>
                <Link color='#41CA99' onPress={() => navigation.navigate('SignIn')}>Sign in</Link>
            </View>
        </View>
    );
};

SignUpScreen.navigationOptions = {
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
    input: {
        width: 300,
    },
    submit: {
        width: 300
    }
});

export default SignUpScreen;


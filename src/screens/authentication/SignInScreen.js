import React, { useState } from 'react';
// Components
import {
    View,
    StyleSheet,
    Keyboard,
    Alert
} from 'react-native';
import {
    Button,
    Text,
    Input,
    Link
} from '../../components/froyo-elements';
import ScreenContainer from '../../components/ScreenContainer';
// Context
import { useUser } from '../../context/UserContext';

const SignInScreen = ({ navigation }) => {
    const { signIn } = useUser();
    // Sign in feilds
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Status states
    const [loading, setLoading] = useState(false);

    // Event handlers
    const handleSubmit = async () => {
        let formSuccess = false;
        try {
            Keyboard.dismiss()
            setLoading(true);
            await signIn({ email, password });
            formSuccess = true;
        }
        catch (err) {
            Alert.alert(err.message);
        }
        finally {
            setLoading(false);
            if (formSuccess) {
                navigation.navigate('ResolveAuth');
            }
        }
    };

    const handleRefSignUp = () => {
        navigation.navigate('SignUp')
    };

    return (
        <ScreenContainer>
            <View style={styles.form}>
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
                    type='primary'
                    loading={loading}
                    buttonStyle={styles.submit}
                    onPress={handleSubmit}
                />
                <View style={styles.bottomText}>
                    <Text style={styles.linkLabel}>Don't have an account?</Text>
                    <Link
                        color='#41CA99'
                        onPress={handleRefSignUp}
                    >
                        Sign up
                    </Link>
                </View>
            </View>
        </ScreenContainer>
    );
};

SignInScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    header: {
        fontSize: 48,
        marginBottom: 15
    },
    // Form elements
    input: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    forgotPassword: {
        marginBottom: 5
    },
    submit: {
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    // Bottom text
    bottomText: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linkLabel: {
        fontSize: 18
    }
});

export default SignInScreen;


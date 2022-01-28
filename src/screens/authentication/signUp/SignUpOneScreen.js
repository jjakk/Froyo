import React, { useState } from 'react';
// Components
import {
    View,
    Keyboard,
    StyleSheet
} from 'react-native';
import {
    Text,
    Input,
    Link,
    Button,
    DatePicker
} from '../../../components/froyo-elements';
import ScreenContainer from '../../../components/ScreenContainer';
import ErrorMessage from '../../../components/messages/ErrorMessage';
// Context
import { useUser } from '../../../context/UserContext';

const SignUpScreenOne = ({ navigation }) => {
    const { continueSignUp } = useUser();
    // Form feilds
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    // Status states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Event Handlers
    const handleSubmit = () => {
        setLoading(true);
        Keyboard.dismiss();
        setError('');
        continueSignUp({ email, username, dob }, (err) => {
            setLoading(false);
            if (err) {
                setError(err);
            }
            else {
                navigation.navigate('SignUpTwo', { email, username, dob });
            }
        });
    }
    
    const handleRefSignIn = () => {
        setError('');
        navigation.navigate('SignIn')
    };

    return (
        <ScreenContainer>
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
                <DatePicker
                    buttonStyle={{width: 300}}
                    containerStyle={styles.submitContainer}
                    dob={dob}
                    setDob={setDob}
                />
                <Button
                    title='Continue'
                    type='primary'
                    loading={loading}
                    buttonStyle={styles.submit}
                    containerStyle={styles.submitContainer}
                    onPress={handleSubmit}
                />
                <View style={styles.bottomText}>
                    <Text>Already have an account?</Text>
                    <Link
                        color='#41CA99'
                        onPress={handleRefSignIn}
                    >
                        Sign in
                    </Link>
                    <ErrorMessage message={error} />
                </View>
            </View>
        </ScreenContainer>
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
    }
});

export default SignUpScreenOne;


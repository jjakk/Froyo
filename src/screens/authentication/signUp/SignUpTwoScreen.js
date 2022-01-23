import React, { useState } from 'react';
// Components
import {
    View,
    Keyboard,
    StyleSheet,
} from 'react-native';
import {
    Text,
    Input,
    Button
} from '../../../components/froyo-elements';
import Header from '../../../components/Header';
import ScreenContainer from '../../../components/ScreenContainer';
import ErrorMessage from '../../../components/messages//ErrorMessage';
// Context
import { useUser } from '../../../context/UserContext';

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
    // Status states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Context values & functions
    const { signUp} = useUser();

    const handleSubmit = () => {
        setLoading(true);
        setError('');
        Keyboard.dismiss();
        signUp({
            email,
            username,
            dob,
            first_name: firstName,
            last_name: lastName,
            password,
            passwordConfirm
        }, (err) => {
            setLoading(false);
            if (err) {
                setError(err);
            }
            else {
                navigation.navigate('ResolveAuth');
            }
        });
    };

    return (
        <ScreenContainer>
            <Header navigation={navigation} />
            <View style={styles.auth}>
                <Text style={styles.header}>Sign up</Text>
                <Input
                    style={styles.input}
                    placeholder='First name'
                    autoCorrect={false}
                    onChangeText={setFirstName}
                />
                <Input
                    style={styles.input}
                    placeholder='Last name'
                    autoCorrect={false}
                    onChangeText={setLastName}
                />
                <Input
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Input
                    style={styles.input}
                    placeholder='Confirm Password'
                    onChangeText={setPasswordConfirm}
                    secureTextEntry
                />
                <Button
                    title='Sign up'
                    color='#41CA99'
                    textColor='white'
                    type='primary'
                    loading={loading}
                    buttonStyle={styles.submit}
                    containerStyle={styles.submitContainer}
                    onPress={handleSubmit}
                />
                <ErrorMessage message={error} />
            </View>
        </ScreenContainer>
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
        margin: 25
    }
});

export default SignUpTwoScreen;


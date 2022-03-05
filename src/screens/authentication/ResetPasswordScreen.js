import React, { useState } from 'react';
// Components
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Input,
    Button,
    Text
} from './../../components/froyo-elements';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import ErrorMessage from '../../components/messages/ErrorMessage';
// Context
import { useUser } from '../../context/UserContext';

const ResetPasswordScreen = ({ navigation }) => {
    // Context
    const { resetPassword } = useUser();

    // State
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async () => {
        try {
            setError('');
            setLoading(true);
            await resetPassword(email);
            setSuccess(true);
        }
        catch (err) {
            setError(err.response.data || err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer>
            <Header navigation={navigation} />
            <View style={styles.form}>
                {
                    success ? (
                        <Text style={styles.confirmation}>
                            ✉️
                            {'\n'}
                            Password reset email sent!
                        </Text>
                    ) : (
                        <>
                        <Text style={styles.header}>Reset Password</Text>
                        <Input
                            style={styles.input}
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Button
                            buttonStyle={styles.submit}
                            title='Reset'
                            type='primary'
                            loading={loading}
                            onPress={onSubmit}
                        />
                        <ErrorMessage
                            error={error}
                            setError={setError}
                        />
                        </>
                    )
                }
            </View>
        </ScreenContainer>
    );
};

ResetPasswordScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        alignItems: 'center',
        marginTop: 100
    },
    header: {
        fontSize: 36,
        marginBottom: 10,
        textAlign: 'center'
    },
    input: {
        width: 300,
        margin: 10
    },
    submit: {
        width: 300,
        margin: 10
    },
    confirmation: {
        textAlign: 'center',
        width: 300,
        fontSize: 36,
    },
    back: {
        margin: 25
    }
});

export default ResetPasswordScreen;
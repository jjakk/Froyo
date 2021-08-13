import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Input,
    Spacer,
    Button
} from '../../../components/froyo-elements';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreenTwo = ({ navigation }) => {
    const { signUp, clearErrorMessage, state: { errorMessage } } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <SafeAreaView>
                    <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
                </SafeAreaView>
                <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('SignUpOne')}>
                    <Ionicons name="arrow-back" size={52} color="black" />
                </TouchableOpacity>
                <View style={styles.auth}>
                    <Text style={styles.header}>Sign up</Text>
                    <Spacer>
                        <Input style={styles.input} placeholder='First name' onChangeText={setFirstName} />
                    </Spacer>
                    <Spacer>
                        <Input style={styles.input} placeholder='Last name' onChangeText={setLastName} />
                    </Spacer>
                    <Spacer>
                        <Input style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry />
                    </Spacer>
                    <Spacer>
                        <Input style={styles.input} placeholder='Confirm Password' onChangeText={setPasswordConfirm} secureTextEntry />
                    </Spacer>
                    <Spacer>
                        <Button
                            title='Sign up'
                            color='#41CA99'
                            textColor='white'
                            type='primary'
                            buttonStyle={styles.submit}
                            onPress={() => {}}
                        />
                    </Spacer>
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

SignUpScreenTwo.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    auth: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
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
    },

    back: {
        margin: 15
    }
});

export default SignUpScreenTwo;


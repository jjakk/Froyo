import React from 'react';
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

const ResetPasswordScreen = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Header navigation={navigation} />
            <View style={styles.form}>
                <Text style={styles.header}>Reset Password</Text>
                <Input style={styles.input} placeholder='Email' />
                <Button
                    buttonStyle={styles.submit}
                    title='Reset'
                    type='primary'
                    color='#41CA99'
                    textColor='white'
                />
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
    },
    input: {
        width: 300,
        margin: 10
    },
    submit: {
        width: 300,
        margin: 10
    },
    back: {
        margin: 25
    }
});

export default ResetPasswordScreen;
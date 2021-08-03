import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import {
    Input,
    Button,
    Text
} from './../../components/froyo-elements';
import { Ionicons } from '@expo/vector-icons';

const ResetPasswordScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <SafeAreaView>
                    <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
                </SafeAreaView>
                <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('SignIn')}>
                    <Ionicons name="arrow-back" size={52} color="black" />
                </TouchableOpacity>
                <View style={styles.container} forceInset={{ top: 'always' }}>
                    <View style={styles.form}>
                        <Text style={styles.header} >Reset Password</Text>
                        <Input style={styles.input} placeholder='Email' />
                        <Button
                            buttonStyle={styles.submit}
                            title='Reset Password'
                            type='primary'
                            color='#41CA99'
                            textColor='white'
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
        margin: 20
    },
    submit: {
        width: 300,
        margin: 20
    },
    back: {
        margin: 15
    }
});

export default ResetPasswordScreen;
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    View,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {
    Input,
    Button,
    Text
} from './../../components/froyo-elements';
import BackIcon from '../../../assets/icons/Back.svg';

const ResetPasswordScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <SafeAreaView>
                    <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
                </SafeAreaView>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.pop()
                    }}
                >
                    <BackIcon width={25} height={25} style={styles.back} />
                </TouchableWithoutFeedback>
                <View style={styles.container} forceInset={{ top: 'always' }}>
                    <View style={styles.form}>
                        <Text style={styles.header} >Reset Password</Text>
                        <Input style={styles.input} placeholder='Email' />
                        <Button
                            buttonStyle={styles.submit}
                            title='Reset'
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
import React from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Text from '../../components/Text';

const SignUpScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>Sign up</Text>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{alignSelf: 'center', color: '#41CA99'}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    header: {
        fontSize: 48
    }
});

export default SignUpScreen;


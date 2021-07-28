import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
    return (  
        <LinearGradient
            colors={['#37B899', '#41CA78']}
            style={styles.container}
        >
            <SafeAreaView>
                <StatusBar backgroundColor="#37B899" barStyle="light-content" />
            </SafeAreaView>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo/Logo-White.png')}
                    style={styles.logo}
                />
                <Text>
                    <Text style={styles.title}>Froyo</Text>
                    <Text style={styles.subTitle}>{'\n'}Ethical Social Media</Text>
                </Text>
            </View>
            <View style={styles.authOptions}>
                <Button
                    title='Sign in'
                    color='white'
                    textColor='#41CA99'
                    type='primary'
                    buttonStyle={styles.primary}
                />
                <Button
                    title='Sign up'
                    color='white'
                    type='secondary'
                    buttonStyle={styles.secondary}
                />
            </View>
        </LinearGradient>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 150
    },
    logo: {
        width: 82,
        height: 91,
        marginRight: 15
    },
    title: {
        color: 'white',
        fontSize: 42,
        fontFamily: 'Nunito-Bold'
    },
    subTitle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 18,
        fontFamily: 'Nunito'
    },
    authOptions: {
        position: 'absolute',
        bottom: 75
    },
    primary: {
        width: 300,
        marginBottom: 25
    },
    secondary: {
        width: 300
    },
});

export default WelcomeScreen;
import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <LinearGradient
                colors={['#3EC7A6', '#41CA78']}
                style={styles.container}
            >
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
                        buttonStyle={styles.primary}
                        titleStyle={styles.primaryText}
                    />
                    <Button
                        title='Sign up'
                        buttonStyle={styles.secondary}
                        titleStyle={styles.secondaryText}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
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
        bottom: 100
    },
    primary: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        width: 300,
        marginBottom: 25
    },
    primaryText: {
        color: '#41CA99',
        fontSize: 28,
    },
    secondary: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        width: 300
    },
    secondaryText: {
        color: 'white',
        fontSize: 28,
    }
});

export default WelcomeScreen;
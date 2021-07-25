import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
    return (
        <LinearGradient
            colors={['#3EC7A6', '#41CA78']}
            style={styles.container}
        >
            <Text style={{fontFamily: 'Nunito', fontSize: 42, color: 'white'}}>Froyo</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});

export default WelcomeScreen;
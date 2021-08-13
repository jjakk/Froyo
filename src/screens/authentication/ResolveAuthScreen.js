import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useContext(AuthContext);
    checkSignedIn();

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/logo/Logo-White.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#41CA99'
    },
    logo: {
        width: 104,
        height: 120,
    }
});

export default ResolveAuthScreen;


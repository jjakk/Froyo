import React, { useEffect, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Context as AuthContext } from '../../context/AuthContext';

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useContext(AuthContext);
    useEffect(() => {
        checkSignedIn();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.animation}>
                <Image style={styles.logo} source={require('../../../assets/logo/Logo-White.png')} />
                <Progress.Bar style={styles.bar} indeterminate={true} width={104} color='white' />
            </View>
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
    animation: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 78,
        height: 90,
    },
    bar: {
        marginTop: 25
    }
});

export default ResolveAuthScreen;


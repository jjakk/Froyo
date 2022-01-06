import React, { useEffect, useContext } from 'react';
// Components
import {
    Image,
    StyleSheet,
    View
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
// Context
import { Context as AuthContext } from '../../context/AuthContext';

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useContext(AuthContext);
    useEffect(() => {
        checkSignedIn();
    }, []);

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.animation}>
                <Image style={styles.logo} source={require('../../../assets/logo/Logo-White.png')} />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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


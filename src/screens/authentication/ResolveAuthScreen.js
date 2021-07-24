import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useContext(AuthContext);
    checkSignedIn();

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='white'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#41CA99'
    }
});

export default ResolveAuthScreen;


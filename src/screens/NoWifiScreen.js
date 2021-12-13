import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text, Button } from '../components/froyo-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoWifiIcon from '../../assets/icons/NoWifi.svg';
import { colors } from '../constants/constants';

const NoWifiScreen = ({ navigation }) => {

    const onReconnect = () => {
        navigation.navigate('ResolveAuth');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.label}>
                    <NoWifiIcon
                        style={styles.icon}
                        width={50}
                        height={50}
                    />
                    <Text style={styles.text}>No Wifi</Text>
                </View>
                <Button
                    title='Reconnect'
                    color={colors.FROYO_GREEN}
                    buttonStyle={styles.button}
                    onPress={onReconnect}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50
    },
    text: {
        fontSize: 32,
        fontFamily: 'Nunito-SemiBold'
    },
    icon: {
        marginRight: 15
    },
    button: {
        width: 200
    }
});

export default NoWifiScreen;

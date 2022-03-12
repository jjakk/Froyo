import React from 'react';
// Components
import { Appearance, StyleSheet, View } from 'react-native';
import { Text, Button } from '../components/froyo-elements';
import ScreenContainer from '../components/ScreenContainer';
// Icons
import NoWifiIcon from '../../assets/icons/NoWifi.svg';
// Constants
import { colors } from '../constants/constants';

const NoWifiScreen = ({ navigation }) => {
    // Theme
    const theme = Appearance.getColorScheme();
    const darkModeEnabled = theme === 'dark' ;

    // Event handlers
    const onReconnect = () => {
        navigation.navigate('ResolveAuth');
    }

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.main}>
                <View style={styles.label}>
                    <NoWifiIcon
                        style={styles.icon}
                        width={50}
                        height={50}
                        color={darkModeEnabled ? colors.light.SECOND : colors.BLACK}
                    />
                    <Text style={[
                        styles.text
                    ]}>No Wifi</Text>
                </View>
                <Button
                    title='Reconnect'
                    buttonStyle={styles.button}
                    onPress={onReconnect}
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
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

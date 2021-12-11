import React from 'react';
// Navigation
import { navigate } from '../navigation/navigationRef';
// Components
import { StyleSheet, View } from 'react-native';
import { TouchableIcon } from './froyo-elements';
import BackIcon from '../../assets/icons/Back.svg';

const Header = ({ navigation }) => {
    const onBack = () => {
        navigation.pop();
    };

    return (
        <View style={styles.header}>
            <TouchableIcon
                Icon={BackIcon}
                size={25}
                onPress={onBack}
                style={styles.back}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 2,
        padding: 20,
        flexDirection: 'row'
    },
});

export default Header;
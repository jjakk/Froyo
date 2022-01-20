import React from 'react';
// Components
import { StyleSheet } from 'react-native';
import SettingsOptions from '../components/settings/SettingsList';;
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
// Constants
import { colors } from '../constants/constants';

const SettingsScreen = ({ navigation }) => {

    return (
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <Header
                navigation={navigation}
                title='Settings'
            />
            <SettingsOptions />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE
    }
});

export default SettingsScreen;


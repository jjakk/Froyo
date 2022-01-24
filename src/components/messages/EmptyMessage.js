import React from 'react';
// Components
import { View, StyleSheet } from 'react-native';
import { Text } from '../froyo-elements';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const EmptyMessage = ({ style, subheaderText }) => {
    const { state: { darkModeEnabled } } = useSettings();

    return (
        <View style={[styles.container, style]}>
            <Text style={[
                styles.text,
                darkModeEnabled ? darkModeStyles.text : null,
                styles.header
            ]}>Nothing to show</Text>
            <Text style={[
                styles.text,
                darkModeEnabled ? darkModeStyles.text : null,
                styles.subheader
            ]}>{subheaderText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center'
    },
    header: {
        fontSize: 24,
        marginBottom: 10
    },
    subheader: {
        fontSize: 18
    }
});

const darkModeStyles = StyleSheet.create({
    text: {
        color: colors.WHITE
    },
});

export default EmptyMessage;
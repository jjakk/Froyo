import React from 'react';
// Components
import { StyleSheet, FlatList, View } from 'react-native';
import { Text } from '../components/froyo-elements';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
// Constants
import { colors } from '../constants/constants';

const SettingsScreen = ({ navigation }) => {

    const settingOptions = [
        {
            title: 'first option'
        },
        {
            title: 'second option'
        }
    ];

    return (
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <Header
                navigation={navigation}
                title='Settings'
            />
            {/* Settings list [coming soon] */}
            {/*}
            <FlatList
                data={settingOptions}
                keyExtractor={(__, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.settingOption}>
                        <Text style={styles.settingOptionText}>
                            {item.title}
                        </Text>
                    </View>
                )}
                style={styles.options}
            />
            */}
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE
    },
    settingOption: {
        backgroundColor: colors.WHITE,
        padding: 10,
        marginBottom: 2
    },
    options: {
        flex: 1,
        backgroundColor: colors.LIGHT_GREY
    }
});

export default SettingsScreen;


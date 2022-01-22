import React from 'react';
// Components
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Switch
} from '../froyo-elements';
// Constants
import { colors } from '../../constants/constants';

const SettingsItem = ({ item }) => {
    let RenderItem = () => (<></>);

    switch (item.type) {
        case 'toggle':
            RenderItem = () => (
                <>
                    <Text style={styles.optionText}>
                        {item.title}
                    </Text>
                    <Switch
                        value={item.value}
                        onValueChange={item.onChange}
                    />
                </>
            );
            break;
        case 'dropdown':
            RenderItem = () => (
                <>
                    <Text style={styles.optionText}>
                        {item.title}
                    </Text>
                </>
            );
            break;
        case 'button':
            RenderItem = () => (
                <TouchableOpacity style={styles.button} onPress={item.onPress}>
                    <Text style={[styles.optionText, styles.buttonText, {
                        color: item.color
                    }]}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            );
            break;
    }

    return (
        <View style={styles.option}>
            <RenderItem />
        </View>
    );
}

const styles = StyleSheet.create({
    option: {
        backgroundColor: colors.WHITE,
        padding: 10,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 20
    },
    // Option types
    button: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Nunito-SemiBold',
    }
});

export default SettingsItem;
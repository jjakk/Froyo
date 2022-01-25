import React, { useEffect } from 'react';
// Components
import {
    Image,
    StyleSheet,
    View
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
// Icons
import Logo from '../../../assets/icons/Froyo.svg';
// Context
import { useUser} from '../../context/UserContext';
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useUser();
    const { getSettings, state: { darkModeEnabled } } = useSettings();
    useEffect(() => {
        getSettings();
        checkSignedIn();
    }, []);

    return (
        <ScreenContainer
            style={styles.container}
            statusBarBackgroundColor={colors.GREEN}
            statusBarStyle={'dark-content'}
        >
            <Logo
                color={colors.WHITE}
                width={78}
                height={90}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.GREEN,
    },
    bar: {
        marginTop: 25
    }
});

export default ResolveAuthScreen;


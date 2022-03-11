import React, { useEffect } from 'react';
// Components
import {
    StyleSheet
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
// Icons
import Logo from '../../../assets/icons/Froyo.svg';
// Context
import { useUser} from '../../context/UserContext';
// Constants
import { colors } from '../../constants/constants';

const ResolveAuthScreen = () => {
    const { checkSignedIn } = useUser();
    useEffect(() => {
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
    }
});

export default ResolveAuthScreen;


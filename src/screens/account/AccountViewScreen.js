import React, { useContext } from 'react';
import {
    StyleSheet,
} from 'react-native';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';
// Context
import { Context as UserContext } from '../../context/UserContext';
// Constants
import { colors } from '../../constants/constants';
// Icons
import GearIcon from '../../../assets/icons/Gear.svg';

const AccountViewScreen = ({ navigation }) => {
    const { user: signedInUser } = useContext(UserContext);
    const user = navigation.getParam('user');

    const onSettings = () => {
        navigation.navigate('Settings');
    };

    return(
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <Header
                navigation={navigation}
                RightIcon={user === signedInUser ? GearIcon : null}
                RightIconProps={{
                    onPress: onSettings
                }}
            />
            <PostList
                type='AccountView'
                user={user}
                emptyMessage="You haven't posted anything yet"
                style={styles.postList}
                HeaderComponent={(
                    <UserProfile
                        user={user}
                        style={styles.userProfile}
                    />
                )}
            />
        </ScreenContainer>
    );
};

AccountViewScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE
    },
    postList: {
        backgroundColor: colors.LIGHT_GREY
    },
    userProfile: {
        backgroundColor: colors.WHITE,
    }
});

export default AccountViewScreen;


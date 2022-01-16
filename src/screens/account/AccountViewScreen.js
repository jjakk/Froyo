import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
// Components
import Header from '../../components/Header';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';
import { colors } from '../../constants/constants';

const AccountViewScreen = ({ navigation }) => {
    const user = navigation.getParam('user');

    return(
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <Header
                navigation={navigation}
                style={{ backgroundColor: colors.white }}
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


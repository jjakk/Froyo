import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
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
    const { getUser, user: signedInUser } = useContext(UserContext);
    const [user, setUser] = useState(navigation.getParam('user') || signedInUser);

    const onSettings = () => {
        navigation.navigate('Settings');
    };

    // Get user information onload and onrefresh
    const onRefresh = async () => {
        if(user) setUser(await getUser(user.id));
    }

    return(
        <ScreenContainer
            style={styles.container}
            edges={['top']}
            onDidFocus={onRefresh}
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
                emptyMessage="You haven't posted anything yet"
                user={user}
                style={styles.postList}
                onPullDownRefresh={onRefresh}
                HeaderComponent={(
                    <UserProfile
                        user={user}
                        style={styles.userProfile}
                        onUserUpdate={onRefresh}
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


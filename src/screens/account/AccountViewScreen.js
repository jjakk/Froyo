import React, { useState } from 'react';
import {
    StyleSheet,
} from 'react-native';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';
// Context
import { useUser } from '../../context/UserContext';
import { useSettings } from '../../context/SettingsContext';
// Constants
import { colors } from '../../constants/constants';
// Icons
import GearIcon from '../../../assets/icons/Gear.svg';

const AccountViewScreen = ({ navigation }) => {
    const { getUser, state: { user: signedInUser } } = useUser();
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
            edges={['top']}
            onDidFocus={onRefresh}
        >
            <Header
                navigation={navigation}
                RightIcon={user.id === signedInUser.id ? GearIcon : null}
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
    
});

export default AccountViewScreen;


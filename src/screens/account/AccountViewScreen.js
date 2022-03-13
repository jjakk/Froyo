import React, { useState, useEffect } from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/users/UserProfile';
// Context
import { useUser } from '../../context/UserContext';
// Icons
import GearIcon from '../../../assets/icons/Gear.svg';

const AccountViewScreen = ({ navigation }) => {
    const { getUser, state: { user: signedInUser } } = useUser();
    const [user, setUser] = useState(navigation.getParam('user') || signedInUser);

    const onSettings = () => {
        navigation.navigate('Settings');
    };

    // Get user information & posts onload and onrefresh
    const onRefresh = async () => {
        setUser(await getUser(user.id));
    }

    useEffect(() => {
        onRefresh();
    }, [navigation.getParam('user')]);
    
    return(
        <ScreenContainer
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
                onPullDownRefresh={onRefresh}
                ListHeaderComponent={(
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

export default AccountViewScreen;


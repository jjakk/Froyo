import React, { useState, useEffect } from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/users/UserProfile';
// Context
import { useUser } from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Icons
import GearIcon from '../../../assets/icons/Gear.svg';

const AccountViewScreen = ({ navigation }) => {
    // Context
    const {
        getUser,
        state: {
            user: signedInUser
        }
    } = useUser();
    const {
        searchContent
    } = useContent();

    // Navigation Params
    const passedUser = navigation.getParam('user') || signedInUser;

    // State
    const [user, setUser] = useState(passedUser);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const onSettings = () => {
        navigation.navigate('Settings');
    };

    // Get user information & posts onload and onrefresh
    const retreiveUser = async () => {
        setLoading(true);
        setUser(await getUser(passedUser.id));
        setPosts(await searchContent('post', { author_id: user.id }));
        setLoading(false);
    }

    useEffect(() => {
        retreiveUser();
    }, [passedUser]);
    
    return(
        <ScreenContainer
            onDidFocus={retreiveUser}
        >
            <Header
                RightIcon={
                    user.id === signedInUser.id
                        ? GearIcon : null
                }
                RightIconProps={{
                    onPress: onSettings
                }}
            />
            <PostList
                emptyMessage="You haven't posted anything yet"
                data={posts}
                loading={loading}
                onRefresh={retreiveUser}
                ListHeaderComponent={(
                    <UserProfile
                        user={user}
                        loading={loading}
                        onRefresh={retreiveUser}
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


import React, {
    useContext,
    useState
} from 'react';
import {
    StyleSheet,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import ScreenContainer from '../../components/ScreenContainer';
// Context
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
// Components
import Header from '../../components/Header';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';
import ErrorMessage from '../../components/ErrorMessage';
import ScrollContainer from '../../components/ScrollContainer';
import { colors } from '../../constants/constants';

const AccountViewScreen = ({ navigation }) => {
    const {
        getUser, 
        follow,
        following,
        state: { user: signedInUser }
    } = useContext(AuthContext);
    const { searchPosts } = useContext(PostContext);
    // User state
    const [user, setUser] = useState(navigation.getParam('user') || signedInUser);
    // List of posts
    const [posts, setPosts] = useState([]);
    // Status states
    const [followingUser, setFollowingUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    
    // Error handling
    const clearError = () => {
        setError('');
    };

    // Function to retrieve user info & posts
    const reloadContent = async () => {
        setLoading(true);
        // Get following if view another user's profile
        if (user.id !== signedInUser.id) {
            (async function(){
                await getFollowing();
            })()
        }
        // Retrieve posts
        setPosts(await searchPosts({ author_id: user.id }));
        // Retreive user information
        setUser(await getUser(user.id));
        setLoading(false);
    };

    // Reusable function to check if the signed in user is following the user viewed
    const getFollowing = async () => {
        setLoading(true);
        setFollowingUser(await following(signedInUser.id, user.id));
        setLoading(false);
    };

    // Event handlers
    const onDidFocus = async () => {
        await reloadContent();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await reloadContent(true);
        setRefreshing(false);
    };

    const onFollow = async () => {
        await follow(user.id);
        await getFollowing();
    };

    return(
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <NavigationEvents onDidFocus={onDidFocus}/>
            <Header
                navigation={navigation}
                style={{ backgroundColor: colors.white }}
            />
            <PostList
                posts={posts}
                loading={loading}
                emptyMessage="You haven't posted anything yet"
                onPostDelete={reloadContent}
                onError={setError}
                style={styles.postList}
                refreshable={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
                HeaderComponent={(
                    <UserProfile
                        user={user}
                        loading={loading}
                        onFollow={onFollow}
                        following={followingUser}
                        style={styles.userProfile}
                    />
                )}
            />
            <ErrorMessage
                type='box'
                message={error}
                clearError={clearError}
                style={styles.error}
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
    },
    error: {
        position: 'absolute',
        bottom: 0,
        margin: 25
    }
});

export default AccountViewScreen;


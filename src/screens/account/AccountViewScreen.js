import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl
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

const AccountViewScreen = ({ navigation }) => {
    const { getUserById, state: { user: defaultUser } } = useContext(AuthContext);
    const { searchPosts } = useContext(PostContext);
    // User state
    const [user, setUser] = useState(navigation.getParam('user') || defaultUser);
    // List of posts
    const [posts, setPosts] = useState([]);
    // Status states
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    
    
    // Error handling
    const onError = (err) => {
        setError(err);
    }
    const clearError = () => {
        setError('');
    };

    // Function to retrieve user info & posts
    const reloadContent = async () => {
        setLoading(true);
        // Retrieve posts
        await searchPosts({ author_id: user.id }, (posts, err) => {
            if (err) {
                setError(err);
            }
            else {
                setPosts(posts);
            }
        });
        // Retreive user information
        await getUserById(user.id, (user, err) => {
            if(err) {
                setError(err);
            }
            else {
                setUser(user);
            }
        });
        setLoading(false);
    };

    // Refresh content when loading this page
    const handleDidFocus = async () => {
        await reloadContent();
    };

    // Handle refresh pulldown
    const onRefresh = async () => {
        setRefreshing(true);
        await reloadContent(true);
        setRefreshing(false);
    };

    return(
        <ScreenContainer
            style={styles.container}
            edges={['top']}
        >
            <NavigationEvents onDidFocus={handleDidFocus}/>
            <Header
                navigation={navigation}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <UserProfile
                    user={user}
                    loading={loading}
                />
                <PostList
                    posts={posts}
                    loading={loading}
                    emptyMessage="You haven't posted anything yet"
                    emptyMessageAlign='flex-start'
                    onPostDelete={reloadContent}
                    onError={onError}
                />
            </ScrollView>
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
        backgroundColor: 'white'
    },
    error: {
        position: 'absolute',
        bottom: 0,
        margin: 25
    }
});

export default AccountViewScreen;


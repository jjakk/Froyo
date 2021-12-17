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
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';
import ErrorMessage from '../../components/ErrorMessage';

const AccountViewScreen = () => {
    const { getUserInfo, state: { user } } = useContext(AuthContext);
    const { getUserPosts } = useContext(PostContext);
    // List of posts
    const [posts, setPosts] = useState([]);
    // Status states
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    
    const clearError = () => {
        setError('');
    };

    // Function to retrieve user info & posts
    const reloadContent = async () => {
        setLoading(true);
        await getUserPosts((posts, err) => {
            if (err) {
                setError(err);
            }
            else {
                setPosts(posts);
            }
        });
        await getUserInfo((err) => {
            if(err) setError(err);
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainView}
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
    mainView: {
        flex: 1,
    },
    error: {
        position: 'absolute',
        bottom: 0,
        margin: 25
    }
});

export default AccountViewScreen;


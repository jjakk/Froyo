import React, {
    useContext,
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
    const {
        clearErrorMessage: clearAuth,
        getUserInfo,
        state: {
            user,
            errorMessage: authError
        }
    } = useContext(AuthContext);
    const {
        clearErrorMessage: clearPost,
        getUserPosts,
        state: {
            errorMessage: postError,
        }
    } = useContext(PostContext);
    // Boolean to check if the posts have loaded
    const [loadingContent, setLoadingContent] = useState(true);
    // Boolean to control whether content is refreshing
    const [refreshing, setRefreshing] = useState(false);
    // List of posts
    const [posts, setPosts] = useState([]);

    // Function to retrieve user info & posts
    const reloadContent = async () => {
        setLoadingContent(true);
        setPosts(await getUserPosts());
        await getUserInfo();
        setLoadingContent(false);
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
            <NavigationEvents onDidFocus={handleDidFocus} />
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
                    loading={loadingContent}
                />
                <PostList
                    posts={posts}
                    loading={loadingContent}
                    emptyMessage="You haven't posted anything yet"
                    onPostDelete={reloadContent}
                />
            </ScrollView>
            <ErrorMessage
                type='box'
                message={authError || postError}
                clearFunctions={[clearAuth, clearPost]}
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


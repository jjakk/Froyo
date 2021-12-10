import React, {
    useContext,
    useState
} from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationEvents } from 'react-navigation';
// Context
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
// Components
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';

const AccountViewScreen = () => {
    const { state: { user } } = useContext(AuthContext);
    const { getUserPosts } = useContext(PostContext);
    // Boolean to check if the posts have loaded
    const [loadingContent, setLoadingContent] = useState(true);
    // List of posts
    const [posts, setPosts] = useState([]);

    // Function to retrieve user info & posts
    const reloadContent = async () => {
        setLoadingContent(true);
        setPosts(await getUserPosts());
        setLoadingContent(false);
    };

    // Refresh content when moving to this page
    const handleDidFocus = async () => {
        await reloadContent();
    };

    return(
        <SafeAreaView
            style={styles.container}
            edges={['top']}
        >
            <NavigationEvents onDidFocus={handleDidFocus} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        onRefresh={reloadContent}
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
        </SafeAreaView>
    );
};

AccountViewScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default AccountViewScreen;


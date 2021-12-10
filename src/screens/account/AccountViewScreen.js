import React, {
    useContext,
    useState
} from 'react';
import {
    View,
    Image,
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
import { Button, Text, } from '../../components/froyo-elements';
import PostList from '../../components/content/PostList';
import UserProfile from '../../components/UserProfile';

const AccountViewScreen = ({ navigation }) => {
    const { state: { user } } = useContext(AuthContext);
    const { getUserPosts } = useContext(PostContext);
    // Boolean to check if the posts have loaded
    const [contentLoaded, setContentLoaded] = useState(false);
    // Boolean to control whether content is refreshing
    const [refreshing, setRefreshing] = useState(false);
    // List of posts
    const [posts, setPosts] = useState([]);

    // Function to retrieve user info & posts
    const reloadContent = async (refresh=false) => {
        if(refresh) setRefreshing(true);
        setContentLoaded(false);
        setPosts(await getUserPosts());
        setContentLoaded(true);
        if(refresh) setRefreshing(false);
    };

    // Refresh content when loading this page
    const handleDidFocus = async () => {
        await reloadContent();
    };

    // Handle refresh
    const onRefresh = async () => {
        await reloadContent(true);
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
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <UserProfile
                    user={user}
                    loading={!contentLoaded}
                />
                <PostList
                    posts={posts}
                    loading={!contentLoaded}
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


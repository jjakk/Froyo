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
import * as Progress from 'react-native-progress';
import { NavigationEvents } from 'react-navigation';
// Context
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
// Components
import { Button, Text, } from '../../components/froyo-elements';
import EmptyMessage from '../../components/EmptyMessage';
import Post from '../../components/content/Post';

const AccountViewScreen = ({ navigation }) => {
    const { signOut, state: { user } } = useContext(AuthContext);
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

    // Go to Account Edit when "Edit profile" button's pressed
    const handleEditProfile = () => {
        navigation.navigate('AccountEdit');
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
                <View style={styles.profile}>
                    <View style={styles.header}>
                        <Image style={styles.profilePicture} source={require('../../../assets/icons/guest.png')} />
                        {
                            contentLoaded ? (
                                <View style={styles.headerText}>
                                    <Text
                                        style={styles.name}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit={true}
                                    >
                                        {user.first_name} {user.last_name}
                                    </Text>
                                    <Text
                                        style={styles.username}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit={true}
                                    >
                                        {contentLoaded ? `@${user.username}` : ''}
                                    </Text>
                                    <View style={styles.numbers}>
                                        <Text style={styles.followers}>
                                            {contentLoaded ? `${0/*user.followers.length*/} Followers` : ''}
                                        </Text>
                                        <Text style={styles.following}>
                                            {contentLoaded ? `${0/*user.following.length*/} Following` : ''}
                                        </Text>
                                    </View>
                                </View>
                            ) : null
                        }
                    </View>
                    {
                        user.description
                            ? (
                                <Text
                                    style={styles.description}
                                >
                                    {contentLoaded ? user.description : ''}
                                </Text>
                            )
                            : null
                    }
                </View>
                <View style={styles.auth}>
                    <View style={styles.authButtonContainer}>
                        <Button
                            title='Edit profile'
                            color='#41CA99'
                            textColor='white'
                            pill
                            buttonStyle={styles.authButton}
                            titleStyle={styles.authButtonText}
                            onPress={handleEditProfile}
                        />
                    </View>
                    <View style={styles.gap}></View>
                    <View  style={styles.authButtonContainer}>
                        <Button
                            title='Sign out'
                            color='#41CA99'
                            textColor='#41CA99'
                            type='secondary'
                            pill
                            onPress={signOut}
                            buttonStyle={styles.authButton}
                            titleStyle={styles.authButtonText}
                        />
                    </View>
                </View>
                <View style={styles.posts}>
                    {
                        contentLoaded ?
                            (
                                posts.length > 0 ? (
                                    <View style={styles.postView}>
                                    {
                                        posts.map(post => (
                                            <Post
                                                key={post.id}
                                                data={{
                                                    ...post,
                                                }}
                                                onDelete={reloadContent}
                                                clickable
                                            />
                                        ))
                                    }
                                    </View>
                                ) : (
                                    <EmptyMessage
                                        style={styles.emptyMessage}
                                        subheaderText="You haven't posted anything yet"
                                    />
                                )
                            ) : (
                                <Progress.CircleSnail
                                    size={50}
                                    indeterminate={true}
                                    spinDuration={1000}
                                    color='#41CA99'
                                    style={styles.postLoading}
                                />
                            )
                    }
                </View>
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
    },
    // Profile
    profile: {
        margin: 25,
        marginBottom: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        marginLeft: 15
    },
    profilePicture: {
        width: 100,
        height: 100
    },
    name: {
        fontSize: 30,
    },
    username: {
        fontSize: 24,
        marginBottom: 5,
        width: 225,
        opacity: 0.75
    },
    numbers: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    followers: {
        fontSize: 18
    },
    following: {
        fontSize: 18,
        marginLeft: 10
    },
    description: {
        fontSize: 22,
        marginBottom: 15,
    },
    accountInfoLoading: {
        marginLeft: 50,
        alignSelf: 'center'
    },
    // Auth
    auth: {
        margin: 25,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    authButtonContainer: {
        flex: 1,
    },
    gap: {
        width: 25,
    },
    authButtonText: {
        fontSize: 20
    },
    // Posts
    posts: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    postView: {
        marginTop: 5,
        paddingTop: 5,
        flex: 1,
        backgroundColor: '#F2F2F2',
        width: '100%'
    },
    emptyMessage: {
        marginTop: 50,
    },
    postLoading: {
        marginTop: 50,
    }
});

export default AccountViewScreen;


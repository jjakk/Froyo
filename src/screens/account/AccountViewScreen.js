import React, {
    useContext,
    useEffect,
    useState,
    useCallback
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
import { Button, Text, } from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
import EmptyMessage from '../../components/EmptyMessage';
import Post from '../../components/Post';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const AccountViewScreen = ({ navigation }) => {
    const { getUserInfo, signOut, state: { user } } = useContext(AuthContext);
    const { deletePost, getUserPosts, state: { posts } } = useContext(PostContext);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Get user info on mount
    useEffect(() => {
        (async function(){
            await getUserInfo();
            await getUserPosts();
            setContentLoaded(true);
        })();
    }, []);

    const handleEditProfile = () => {
        navigation.navigate('AccountEdit');
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setContentLoaded(false);
        await getUserInfo();
        await getUserPosts();
        setContentLoaded(true);
        setRefreshing(false);
      }, []);

    return(
        <SafeAreaView style={styles.container}>
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
                                        {user.firstName} {user.lastName}
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
                                            {contentLoaded? `${user.followers.length} Followers` : ''}
                                        </Text>
                                        <Text style={styles.following}>
                                            {contentLoaded? `${user.following.length} Following` : ''}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <Progress.CircleSnail
                                    size={50}
                                    indeterminate={true}
                                    spinDuration={1000}
                                    color='#41CA99'
                                    style={styles.accountInfoLoading}
                                />
                            )
                        }
                    </View>
                    {
                        user.description
                            ? (
                                contentLoaded ? (
                                    <Text
                                        style={styles.description}
                                    >
                                        {user.description}
                                    </Text>
                                ) : (
                                    <Progress.CircleSnail
                                        size={50}
                                        indeterminate={true}
                                        spinDuration={1000}
                                        color='#41CA99'
                                        style={styles.accountInfoLoading}
                                    />
                                )
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
                                                key={post._id}
                                                author={`${user.firstName} ${user.lastName}`}
                                                uploadDate={post.timestamp}
                                                text={post.body}
                                                onDelete={() => {
                                                    deletePost(post._id, async (success) => {
                                                        if(success) await getUserPosts();
                                                    })
                                                }}
                                                onEdit={() => {
                                                    navigation.navigate('PostEdit', { id: post._id });
                                                }}
                                                onPress={() => {
                                                    navigation.navigate('PostView', { id: post._id });
                                                }}
                                                navigation={navigation}
                                                personalPost={post.author === user._id}
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
        alignItems: 'center'
    },
    postView: {
        marginTop: 5,
        paddingTop: 5,
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


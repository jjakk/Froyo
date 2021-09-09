import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, StatusBar, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { Button, Text, } from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';
import EmptyMessage from '../../components/EmptyMessage';
import Post from '../../components/Post';

const AccountViewScreen = ({ navigation }) => {
    const { getUserInfo, getUserPosts, signOut, state: { user, posts } } = useContext(AuthContext);
    const [contentLoaded, setContentLoaded] = useState(false);

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

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View style={styles.profile}>
                <View style={styles.header}>
                    <Image style={styles.profilePicture} source={require('../../../assets/icons/guest.png')} />
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
                            <Text style={styles.followers}>{contentLoaded? `${user.followers.length} Followers` : ''}</Text>
                            <Text style={styles.following}>{contentLoaded? `${user.following.length} Following` : ''}</Text>
                        </View>
                    </View>
                </View>
                {
                    user.description
                        ? (
                            <Text style={styles.description}>
                                {user.description}
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
                <Text style={styles.postsHeader}>Posts</Text>
                <View style={styles.postsHeaderUnderline}></View>
                {
                    contentLoaded ?
                        (
                            posts.length > 0 ? (
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={posts}
                                    style={styles.postView}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => {
                                        return (
                                            <Post
                                                author={`${user.firstName} ${user.lastName}`}
                                                age={'1hr'}
                                                text={item.body}
                                            />
                                        );
                                    }}
                                />
                            ) : (
                                <EmptyMessage
                                    subheaderText="You haven't posted anything yet"
                                />
                            )
                        )
                        : (
                            <Progress.CircleSnail size={50} indeterminate={true} spinDuration={1000} color='#41CA99' />
                        )
                }
            </View>
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
        marginBottom: 25,
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
        fontSize: 22
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
    postsHeader: {
        textAlign: 'center',
        fontSize: 32,
        margin: 10
    },
    postsHeaderUnderline: {
        width: 125,
        height: 2,
        backgroundColor: 'black',
        opacity: 0.75,
        marginBottom: 10,
        borderRadius: 2
    },
    postView: {
        marginTop: 25,
        backgroundColor: '#F2F2F2',
        width: '100%'
    }
});

export default AccountViewScreen;


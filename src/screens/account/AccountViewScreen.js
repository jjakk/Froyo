import React, { useContext, useEffect } from 'react';
import { SafeAreaView, View, Image, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, Spacer, Br } from '../../components/froyo-elements';
import { Context as AuthContext } from '../../context/AuthContext';

const AccountViewScreen = () => {
    const { getUserInfo, signOut, state: { loading, user } } = useContext(AuthContext);

    useEffect(() => {
        getUserInfo();
    }, []);

    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#F2F2F2' barStyle='dark-content' />
            <View style={styles.profile}>
                <View style={styles.header}>
                    <Image style={styles.profilePicture} source={require('../../../assets/icons/guest.png')} />
                    <View style={styles.headerText}>
                        <Text style={styles.name} numberOfLines={1}>
                            {user.firstName} {user.lastName}
                        </Text>
                        <Text style={styles.username} numberOfLines={1}>
                            {!loading ? `@${user.username}` : ''}
                        </Text>
                        <View style={styles.numbers}>
                            <Text style={styles.followers}>{!loading? `${user.followers.length} Followers` : ''}</Text>
                            <Text style={styles.following}>{!loading? `${user.following.length} Following` : ''}</Text>
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
                <Button
                    title='Edit profile'
                    color='#41CA99'
                    textColor='white'
                    buttonStyle={styles.authButton}
                    titleStyle={styles.authButtonText}
                />
                <Button
                    title='Sign out'
                    color='#41CA99'
                    textColor='white'
                    onPress={() => {
                        signOut();
                    }}
                    buttonStyle={styles.authButton}
                    titleStyle={styles.authButtonText}
                />
            </View>
            <View style={styles.post}>
                <Text style={styles.postsHeader}>Posts</Text>

            </View>
        </SafeAreaView>
    );
};

AccountViewScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    // Profile
    profile: {
        margin: 25,
        marginBottom: 0
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
        marginBottom: 5
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
        justifyContent: 'space-evenly'
    },
    authButton: {
        width: 150,
    },
    authButtonText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 24
    },
    // Posts
    posts: {
        margin: 25,
    },
    postsHeader: {
        textAlign: 'center',
        fontSize: 28,
        margin: 10
    }
});

export default AccountViewScreen;


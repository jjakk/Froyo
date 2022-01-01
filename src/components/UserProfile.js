import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { navigate } from '../navigation/navigationRef';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from './froyo-elements';

const UserProfile = (props) => {
    const { signOut, state: { user: signedInUser } } = useContext(AuthContext);
    const { style, user, loading } = props;

    // Go to Account Edit when "Edit profile" button's pressed
    const handleEditProfile = () => {
        navigate('AccountEdit');
    };

    return (
        <View style={[styles.container, style]}>
            <View>
                <View style={styles.header}>
                    <Image style={styles.profilePicture} source={require('../../assets/icons/guest.png')} />
                    {
                        !loading ? (
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
                                    {!loading ? `@${user.username}` : ''}
                                </Text>
                                <View style={styles.numbers}>
                                    <Text style={styles.followers}>
                                        {!loading ? `${0/*user.followers.length*/} Followers` : ''}
                                    </Text>
                                    <Text style={styles.following}>
                                        {!loading ? `${0/*user.following.length*/} Following` : ''}
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
                                {!loading ? user.description : ''}
                            </Text>
                        )
                        : null
                }
            </View>
            {
                user.id === signedInUser.id ? (
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
                            buttonStyle={styles.authButton}
                            titleStyle={styles.authButtonText}
                            onPress={signOut}
                        />
                    </View>
                </View>
                ) : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25
    },
    // Profile
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
});

export default UserProfile;
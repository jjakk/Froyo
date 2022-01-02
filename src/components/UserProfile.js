import React, { useState, useContext, useEffect } from 'react';
// Context
import { Context as AuthContext } from '../context/AuthContext';
// Navigation
import { navigate } from '../navigation/navigationRef';
// Components
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import {
    Button,
    Text
} from './froyo-elements';
// Constants
import { colors } from '../constants/constants';

const UserProfile = (props) => {
    const {
        signOut,
        state: { user: signedInUser }
    } = useContext(AuthContext);
    const {
        style,
        user,
        onFollow,
        loading,
        following
    } = props;

    // Event handlers
    const onEditProfile = () => {
        navigate('AccountEdit');
    };

    return (
        <View style={[styles.container, style]}>
            <View>
                <View style={styles.header}>
                    <Image style={styles.profilePicture} source={require('../../assets/icons/guest.png')} />
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
                            {`@${user.username}`}
                        </Text>
                        <View style={styles.numbers}>
                            <Text style={styles.followers}>
                                {`${0/*user.follower_count*/} Followers`}
                            </Text>
                            <Text style={styles.following}>
                                {`${0/*user.follower_count*/} Following`}
                            </Text>
                        </View>
                    </View>
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
            <View style={styles.action}>
            {
                user.id === signedInUser.id ? (
                    <>
                    <View style={styles.actionButtonContainer}>
                        <Button
                            title='Edit profile'
                            color={colors.FROYO_GREEN}
                            textColor='white'
                            pill
                            buttonStyle={styles.actionButton}
                            titleStyle={styles.actionButtonText}
                            onPress={onEditProfile}
                        />
                    </View>
                    <View style={styles.gap}></View>
                    <View  style={styles.actionButtonContainer}>
                        <Button
                            title='Sign out'
                            color={colors.FROYO_GREEN}
                            textColor={colors.FROYO_GREEN}
                            type='secondary'
                            pill
                            buttonStyle={styles.actionButton}
                            titleStyle={styles.actionButtonText}
                            onPress={signOut}
                        />
                    </View>
                    </>
                ) : (
                    <View  style={styles.actionButtonContainer}>
                        <Button
                            title={following ? 'Unfollow' : 'Follow'}
                            color={colors.FROYO_GREEN}
                            textColor={following ? colors.FROYO_GREEN : colors.WHITE}
                            type={following ? 'secondary' : 'primary'}
                            pill
                            loading={loading}
                            buttonStyle={styles.actionButton}
                            titleStyle={styles.actionButtonText}
                            onPress={onFollow}
                        />
                    </View>
                )
            }
            </View>
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
    // actions
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonContainer: {
        flex: 1,
    },
    gap: {
        width: 25,
    },
    actionButtonText: {
        fontSize: 20
    },
});

export default UserProfile;
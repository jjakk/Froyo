import React, { useState, useContext, useEffect } from 'react';
// Context
import { Context as UserContext } from '../context/UserContext';
// Navigation
import { navigate } from '../navigation/navigationRef';
// Components
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Button,
    Text
} from './froyo-elements';
// Constants
import { colors } from '../constants/constants';

const UserProfile = (props) => {
    // Context
    const {
        getUser,
        signOut,
        follow,
        following,
        state: { user: signedInUser }
    } = useContext(UserContext);

    // Props
    const {
        style,
        user: passedUser
    } = props;

    // State
    // Object of the user to display
    const [user, setUser] = useState(passedUser || signedInUser);
    // Whether the current user's following the user being viewed
    const [followingUser, setFollowingUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFollow = async () => {
        await follow(user.id);
        setUser(await getUser(user.id));
    };

    // Event handlers
    const onEditProfile = () => {
        navigate('AccountEdit');
    };

    // Get following status whenever the user state changes (If viewing another user's profile)
    useEffect(() => {
        (async function(){
            if (user.id !== signedInUser.id) {
                setLoading(true);
                setFollowingUser(await following(signedInUser.id, user.id));
                setLoading(false);
            }
        })();
    }, [user]);

    return (
        <TouchableWithoutFeedback>
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
                                    {`${user.follower_count} Followers`}
                                </Text>
                                <Text style={styles.following}>
                                    {`${user.followee_count} Following`}
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
                                    {user.description}
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
                                title={followingUser ? 'Unfollow' : 'Follow'}
                                color={colors.FROYO_GREEN}
                                textColor={followingUser ? colors.FROYO_GREEN : colors.WHITE}
                                type={followingUser ? 'secondary' : 'primary'}
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
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20
    },
    // Profile
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0
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
    // Description
    description: {
        fontSize: 22,
        marginTop: 15,
        marginBottom: 0
    },
    // Actions
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
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
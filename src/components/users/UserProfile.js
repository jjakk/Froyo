import React, {
    useState,
    useEffect
} from 'react';
// Context
import { useUser } from '../../context/UserContext';
// Navigation
import { navigate } from '../../navigation/navigationRef';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Button,
    Text
} from '../froyo-elements';
// Constants
import { BASE_URL, colors } from '../../constants/constants';

const UserProfile = (props) => {
    // Context
    const {
        signOut,
        follow,
        following,
        state: { user: signedInUser }
    } = useUser();

    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        style,
        user=signedInUser,
        onUserUpdate
    } = props;
    
    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? {
            uri: `${BASE_URL}/images/${user.profile_picture_bucket_key}`
        }
        : require('../../../assets/icons/guest.png')
    );

    // State
    // Whether the current user's following the user being viewed
    const [followingUser, setFollowingUser] = useState(false);

    const onFollow = async () => {
        await follow(user.id);
        onUserUpdate();
    };

    // Event handlers
    const onEditProfile = () => {
        navigate('AccountEdit');
    };

    const onSignOut = async () => {
        await signOut();
        navigate('ResolveAuth');
    };

    // Get following status whenever the user state changes (If viewing another user's profile)
    useEffect(() => {
        (async function(){
            if (user.id !== signedInUser.id) {
                setFollowingUser(await following(signedInUser.id, user.id));
            }
        })();
    }, [user]);

    return (
        <TouchableWithoutFeedback>
            <View style={[
                styles.container,
                themeStyles[theme].container,
                style
            ]}>
                <View>
                    <View style={styles.header}>
                        <Image
                            style={styles.profilePicture}
                            resizeMode='cover'
                            source={profilePictureSource}
                        />
                        <View style={styles.headerText}>
                            <Text
                                style={[
                                    styles.name
                                ]}
                                numberOfLines={1}
                                adjustsFontSizeToFit={true}
                            >
                                {user.first_name} {user.last_name}
                            </Text>
                            <Text
                                style={[
                                    styles.username,
                                    themeStyles[theme].text
                                ]}
                                numberOfLines={1}
                                adjustsFontSizeToFit={true}
                            >
                                {`@${user.username}`}
                            </Text>
                            <View style={styles.numbers}>
                                <Text style={[
                                    styles.followers,
                                    themeStyles[theme].text
                                ]}>
                                    {`${user.follower_count} Followers`}
                                </Text>
                                <Text style={[
                                    styles.following,
                                    themeStyles[theme].text
                                ]}>
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
                                pill
                                buttonStyle={styles.actionButton}
                                titleStyle={styles.actionButtonText}
                                onPress={onEditProfile}
                            />
                        </View>
                        <View style={styles.gap}/>
                        <View  style={styles.actionButtonContainer}>
                            <Button
                                title='Sign out'
                                type='secondary'
                                pill
                                buttonStyle={styles.actionButton}
                                titleStyle={styles.actionButtonText}
                                onPress={onSignOut}
                            />
                        </View>
                        </>
                    ) : (
                        <View  style={styles.actionButtonContainer}>
                            <Button
                                title={followingUser ? 'Unfollow' : 'Follow'}
                                color={colors.GREEN}
                                textColor={followingUser ? colors.GREEN : colors.WHITE}
                                type={followingUser ? 'secondary' : 'primary'}
                                pill
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
        padding: 20,
        borderBottomWidth: 1
    },
    // Profile
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        marginLeft: 15
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 100
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

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE,
            borderBottomColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.THIRD,
            borderBottomColor: colors.dark.FIRST
        }
    })
};

export default UserProfile;
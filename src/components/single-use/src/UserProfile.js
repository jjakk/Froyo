import React, {
    useState,
    useEffect
} from "react";
// Context
import { useUser } from "@froyo/user-context";
import { useSettings } from "@froyo/settings-context";
// Navigation
import { navigate } from "@froyo/navigation-ref";
// Components
import {
    Appearance,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import {
    Button,
    Text
} from "@froyo/elements";
// Icons
import { guestProfilePicture } from "@froyo/icons";
// Constants
import { API_ENDPOINT, colors } from "@froyo/constants";

const UserProfile = (props) => {
    // Context
    const {
        signOut,
        follow,
        following,
        getConnections,
        state: {
            user: signedInUser
        }
    } = useUser();
    const { state: { flavor } } = useSettings();

    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        style,
        onFollowToggle,
        loading,
        user
    } = props;
    
    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? {
            uri: `${API_ENDPOINT}/images/${user.profile_picture_bucket_key}`
        }
        : guestProfilePicture(flavor)
    );

    // State
    // Whether the current user's following the user being viewed
    const [followingUser, setFollowingUser] = useState(false);

    const onFollow = async () => {
        await follow(user.id);
        onFollowToggle();
    };

    // Event handlers
    const onGetConnections = async () => {
        const connections = await getConnections(user.id);
        navigate("Connections", { connections });
    };

    const onEditProfile = () => {
        navigate("AccountEdit");
    };

    // Get following status whenever the user state changes (If viewing another user's profile)
    useEffect(() => {
        if(user.id !== signedInUser.id) {
            following(signedInUser.id, user.id)
            .then(setFollowingUser)
            .catch((error) => {
                Alert.alert(error.message);
            });
        }
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
                            resizeMode="cover"
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
                            <TouchableOpacity
                                onPress={onGetConnections}
                            >
                                <Text style={[
                                    styles.numbers,
                                    themeStyles[theme].text
                                ]}>
                                    {`${user.follower_count} Follower${user.follower_count === 1 ? "" : "s"}`}  {`${user.followee_count} Following`}
                                </Text>
                            </TouchableOpacity>
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
                                title="Edit profile"
                                pill
                                titleStyle={styles.actionButtonText}
                                onPress={onEditProfile}
                            />
                        </View>
                        <View style={styles.gap}/>
                        <View  style={styles.actionButtonContainer}>
                            <Button
                                title="Sign out"
                                type="secondary"
                                pill
                                titleStyle={styles.actionButtonText}
                                onPress={signOut}
                            />
                        </View>
                        </>
                    ) : (
                        <View  style={styles.actionButtonContainer}>
                            <Button
                                title={followingUser ? "Unfollow" : "Follow"}
                                loading={loading}
                                type={
                                    loading ? "primary"
                                        : followingUser
                                            ? "secondary" : "primary"
                                }
                                pill
                                titleStyle={styles.actionButtonText}
                                onPress={loading ? ()=>{} : onFollow}
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
        flexDirection: "column",
        padding: 20,
        borderBottomWidth: 1
    },
    // Profile
    header: {
        flexDirection: "row",
        alignItems: "center"
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
        flexDirection: "row",
        alignItems: "center",
        fontSize: 18,
        marginBottom: 5
    },
    // Description
    description: {
        fontSize: 22,
        marginTop: 15,
        marginBottom: 0
    },
    // Actions
    action: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    actionButtonContainer: {
        flex: 1
    },
    gap: {
        width: 25,
    },
    actionButtonText: {
        fontSize: 20,
        paddingHorizontal: 10
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
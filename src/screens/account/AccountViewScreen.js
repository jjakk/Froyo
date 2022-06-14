import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { PostList } from "@froyo/lists";
import { UserProfile, CreateButton } from "@froyo/single-use";
// Context
import { useUser } from "@froyo/user-context";
import { useContent } from "@froyo/content-context";
import { useSettings } from "@froyo/settings-context";
// Icons
import { GearIcon } from "@froyo/icons";

const AccountViewScreen = ({ navigation }) => {
    // Context
    const {
        getUser,
        state: {
            user: signedInUser
        }
    } = useUser();
    const {
        searchContent
    } = useContent();
    const {
        state: {
            hideFeed
        }
    } = useSettings();

    // Navigation Params
    const passedUser = navigation.getParam("user") || signedInUser;

    // State
    const [user, setUser] = useState(passedUser);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const emptyMessage = (
        `${
        user.id === signedInUser.id
            ? "you haven't"
            : "This user hasn't"
        } posted anything yet`
    );

    const onSettings = () => {
        navigation.navigate("Settings");
    };

    // Get user information & posts onload and onrefresh
    const retreiveUser = async () => {
        setLoading(true);
        setUser(await getUser(passedUser.id));
        setPosts(await searchContent("post", { author_id: user.id }));
        setLoading(false);
    }

    useEffect(() => {
        setUser(passedUser);
    }, [passedUser]);

    return(
        <ScreenContainer>
            <Header
                RightIcon={
                    user.id === signedInUser.id
                        ? GearIcon : null
                }
                RightIconProps={{
                    onPress: onSettings
                }}
            />
            <PostList
                emptyMessage={emptyMessage}
                data={posts}
                loading={loading}
                onRefresh={retreiveUser}
                ListHeaderComponent={(
                    <UserProfile
                        user={user}
                        loading={loading}
                        onFollowToggle={retreiveUser}
                    />
                )}
            />
            {
                hideFeed && (
                    <CreateButton
                        style={styles.createPost}
                    />
                )
            }
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    createPost: {
        position: "absolute",
        bottom: 10,
        right: 10,
    }
});

AccountViewScreen.navigationOptions = {
    headerShown: false
};

export default AccountViewScreen;


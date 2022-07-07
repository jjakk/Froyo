import React, {
    useEffect,
    useRef,
    useState
} from "react";
// Components
import { Alert, StyleSheet } from "react-native";
import { CreateButton } from "@froyo/single-use";
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { PostList } from "@froyo/lists";
// Icons
import {
    FroyoIcon,
    ChatIcon,
    guestProfilePicture,
    awsBucketImage
} from "@froyo/icons";
// Context
import { useUser } from "@froyo/user-context";
import { useContent } from "@froyo/content-context";
import { useSettings } from "@froyo/settings-context";

const FeedScreen = ({ navigation }) => {
    // Context
    const { state: { user } } = useUser();
    const { getFeed } = useContent();
    const {
        state: {
            primaryColors,
            flavor
        }
    } = useSettings();

    // Ref
    const postListRef = useRef();

    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? awsBucketImage(user.profile_picture_bucket_key)
        : guestProfilePicture(flavor)
    );

    // Event handlers
    const onAccountView = () => {
        navigation.navigate("AccountView");
    };

    const onOpenChat = () => {
        //Alert.alert("Coming soon");
        navigation.navigate("ChatMenu");
    };

    const onScrollToTop = async () => {
        postListRef.current.scrollToTop();
        await retrieveFeed();
    };

    const onDidFocus = () => {
        postListRef.current.reloadContent();
    };

    // Retreive newsfeed from API and set state accordingly
    const retrieveFeed = async () => {
        setLoading(true);
        setPosts(await getFeed());
        setLoading(false);
    };

    // Get feed initially
    useEffect(() => {
        retrieveFeed();
    }, []);

    return (
        <ScreenContainer
            onDidFocus={onDidFocus}
        >
            <Header
                LeftIconImage={profilePictureSource}
                LeftIconProps={{
                    onPress: onAccountView
                }}
                MiddleIcon={FroyoIcon}
                MiddleIconProps={{
                    color: primaryColors.MAIN,
                    onPress: onScrollToTop
                }}
                RightIcon={ChatIcon}
                RightIconProps={{
                    onPress: onOpenChat
                }}
            />
            <PostList
                emptyMessage="Follow people to populate your feed"
                loading={loading}
                onRefresh={retrieveFeed}
                data={posts}
                ref={postListRef}
            />
            <CreateButton
                style={styles.createPost}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 15,
    },
    createPost: {
        position: "absolute",
        bottom: 10,
        right: 10,
    }
});

export default FeedScreen;


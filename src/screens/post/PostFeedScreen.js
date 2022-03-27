import React, {
    useEffect,
    useRef,
    useState
} from 'react';
// Components
import {
    StyleSheet,
    Image
} from 'react-native';
import CreateButton from '../../components/CreateButton';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import PostList from '../../components/content/PostList';
// Icons
import FroyoIcon from '../../../assets/icons/Froyo.svg';
// Context
import { useUser } from '../../context/UserContext';
import { useContent } from '../../context/ContentContext';
// Constants
import { BASE_URL, colors } from '../../constants/constants';

const FeedScreen = ({ navigation }) => {
    // Context
    const { state: { user } } = useUser();
    const { getFeed } = useContent();

    // Ref
    const postListRef = useRef();

    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? {
            uri: `${BASE_URL}/images/${user.profile_picture_bucket_key}`
        }
        : require('../../../assets/icons/guest.png')
    );

    // Event handlers
    const onAccountView = () => {
        navigation.navigate('AccountView');
    };

    const onCreatePost = () => {
        navigation.navigate('PostCreate');
    };

    const onScrollToTop = async () => {
        postListRef.current.scrollToTop();
        await retrieveFeed();
    };

    const onDidFocus = () => {
        postListRef.current.reloadContent();
    };

    // Network Requests
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
                    color: colors.primary.MAIN,
                    onPress: onScrollToTop
                }}
            />
            <PostList
                emptyMessage='Follow people to populate your feed'
                loading={loading}
                onRefresh={retrieveFeed}
                data={posts}
                ref={postListRef}
            />
            <CreateButton
                onPress={onCreatePost}
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
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

export default FeedScreen;


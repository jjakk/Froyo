import React, { useRef } from 'react';
// Components
import {
    StyleSheet
} from 'react-native';
import CreateButton from '../../components/CreateButton';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import PostList from '../../components/content/PostList';
// Icons
import FroyoIcon from '../../../assets/icons/Froyo.svg';
// Context
import { useUser } from '../../context/UserContext';
// Constants
import { BASE_URL, colors } from '../../constants/constants';

const FeedScreen = ({ navigation }) => {
    // Context
    const { state: { user } } = useUser();
    // Ref
    const postListRef = useRef();
    
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

    const onScrollToTop = () => {
        postListRef.current.scrollToTop();
    };

    const onDidFocus = () => {
        postListRef.current.reloadContent();
    };

    return (
        <ScreenContainer
            onDidFocus={onDidFocus}
        >
            <Header
                navigation={navigation}
                size={35}
                LeftIconImageOverride={profilePictureSource}
                LeftIconProps={{
                    onPress: onAccountView
                }}
                MiddleIcon={FroyoIcon}
                MiddleIconProps={{
                    color: colors.GREEN,
                    onPress: onScrollToTop
                }}
            />
            <PostList
                type='Feed'
                emptyMessage='Follow people to populate your feed'
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


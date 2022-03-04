import React, { useRef } from 'react';
// Components
import {
    StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
// Icons
import FroyoIcon from '../../assets/icons/Froyo.svg';
import ChatIcon from '../../assets/icons/Chat.svg';
// Context
import { useUser } from '../context/UserContext';
// Constants
import { BASE_URL, colors } from '../constants/constants';

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
        : require('../../assets/icons/guest.png')
    );

    // Event handlers
    const onAccountView = () => {
        navigation.navigate('AccountView');
    };

    const onScrollToTop = () => {
        postListRef.current.scrollToTop();
    };

    const onDidFocus = () => {
        postListRef.current.reloadContent();
    };

    return (
        <ScreenContainer
            edges={['top']}
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
                /*RightIcon={ChatIcon}
                style={styles.header}*/
            />
            <PostList
                type='Feed'
                emptyMessage='Follow people to populate your feed'
                ref={postListRef}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 15,
    }
});

export default FeedScreen;


import React, { useRef } from 'react';
// Components
import {
    StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
// Context
import { useSettings } from '../context/SettingsContext';
// Icons
import GuestIcon from '../../assets/icons/Profile-Picture.svg'
import GuestIconLight from '../../assets/icons/Profile-Picture-Light.svg'
// Constants
import { colors } from '../constants/constants';

const FeedScreen = ({ navigation }) => {
    const { state: { darkModeEnabled } } = useSettings();
    const postListRef = useRef();
    
    // Event handlers
    const onAccountView = () => {
        navigation.navigate('AccountView');
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
                LeftIcon={darkModeEnabled ? GuestIconLight : GuestIcon}
                LeftIconProps={{
                    onPress: onAccountView
                }}
                size={50}
                style={styles.header}
            />
            <PostList
                type='Feed'
                emptyMessage='Follow people to populate your feed'
                style={styles.postList}
                ref={postListRef}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomColor: colors.GREY,
        borderBottomWidth: 1,
    }
});

export default FeedScreen;


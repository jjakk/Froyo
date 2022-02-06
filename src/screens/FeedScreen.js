import React, { useRef } from 'react';
// Components
import {
    StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
// Icons
import GuestIcon from '../../assets/icons/Profile-Picture.svg'
import FroyoIcon from '../../assets/icons/Froyo.svg';
import { colors } from '../constants/constants';

const FeedScreen = ({ navigation }) => {
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
                size={50}
                LeftIcon={GuestIcon}
                LeftIconProps={{
                    onPress: onAccountView
                }}
                style={styles.header}
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
        padding: 10,
        borderBottomWidth: 0
    }
});

export default FeedScreen;


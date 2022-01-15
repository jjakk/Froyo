import React, { useState, useContext } from 'react';
// Components
import {
    StyleSheet,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import PostList from '../components/content/PostList';
import ErrorMessage from '../components/ErrorMessage';
// Context
import { Context as PostContext } from '../context/PostContext';
// Icons
import GuestIcon from '../../assets/icons/Profile-Picture.svg'
// Constants
import { colors } from '../constants/constants';

const FeedScreen = ({ navigation }) => {
    const { getFeed } = useContext(PostContext);
    
    // Event handlers
    const onAccountView = () => {
        navigation.navigate('AccountView');
    };

    return (
        <ScreenContainer
            edges={['top']}
        >
            <Header
                navigation={navigation}
                LeftIcon={GuestIcon}
                LeftIconProps={{
                    size: 50,
                    onPress: onAccountView
                }}
                style={styles.header}
            />
            <PostList
                type='Feed'
                emptyMessage='Follow people to populate your feed'
                style={styles.postList}
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


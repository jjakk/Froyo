import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// Screens
import PostFeedScreen from '../../screens/post/PostFeedScreen';
import MeetupFeedScreen from '../../screens/meetup/MeetupFeedScreen';
// Navigators
import searchNavigator from './searchNavigator';
// Icons
import MeetupIcon from '../../../assets/icons/Meetup.svg';
import HomeIcon from '../../../assets/icons/Home.svg';
import SearchIcon from '../../../assets/icons/Search.svg';
// Constants
import { sizes, colors } from '../../constants/constants';

// This navigator organizes the bottom tab bar
const tabNavigator = createBottomTabNavigator({
    Feed: {
        screen: PostFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                    <HomeIcon
                        color={tintColor}
                        height={sizes.TAB_ICON}
                        width={sizes.TAB_ICON*2}
                    />
                ))
        }
    },
    MeetupFeed: {
        screen: MeetupFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <MeetupIcon
                    color={tintColor}
                    height={sizes.TAB_ICON}
                    width={sizes.TAB_ICON*2}
                />
            ))
        }
    },
    Search: {
        screen: searchNavigator,
        navigationOptions: {
            tabBarIcon: (({ tintColor }) => (
                <SearchIcon
                    color={tintColor}
                    height={sizes.TAB_ICON}
                    width={sizes.TAB_ICON*2}
                />
            ))
        }
    }
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: colors.primary.MAIN,
        style: {
            height: 60
        }
    },
    initialRouteName: 'Feed'
});

export default tabNavigator;

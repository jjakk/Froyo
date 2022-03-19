import React from 'react';
import { Appearance } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// SafeAreaProvider
import {
    SafeAreaProvider,
    initialWindowMetrics
} from 'react-native-safe-area-context';
// Set Navigator
import { setNavigator } from './navigationRef';
// Miscellaneous Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import NoWifiScreen from '../screens/NoWifiScreen';
// Search Screens
import SearchContainerScreen from '../screens/search/SearchContainerScreen';
import SearchPostScreen from '../screens/search/SearchPostScreen';
import SearchUserScreen from '../screens/search/SearchUserScreen';
// Authentication Screens
import ResolveAuthScreen from '../screens/authentication/ResolveAuthScreen';
import SignInScreen from '../screens/authentication/SignInScreen';
import SignUpOneScreen from '../screens/authentication/signUp/SignUpOneScreen';
import SignUpTwoScreen from '../screens/authentication/signUp/SignUpTwoScreen';
import ResetPasswordScreen from '../screens/authentication/ResetPasswordScreen';
// Acccount Screens
import AccountViewScreen from '../screens/account/AccountViewScreen';
import AccountEditScreen from '../screens/account/AccountEditScreen';
// Connection Screens
import FollowersScreen from '../screens/connection/FollowersScreen';
import FollowingScreen from '../screens/connection/FollowingScreen';
import ConnectionsContainer from '../screens/connection/ConnectionsContainer';
// Settings Screen
import SettingsScreen from '../screens/SettingsScreen';
// Post Screens
import PostFeedScreen from '../screens/post/PostFeedScreen';
import PostCreateScreen from '../screens/post/PostCreateScreen';
import PostEditScreen from '../screens/post/PostEditScreen';
import PostViewScreen from '../screens/post/PostViewScreen';
// Comment Screens
import CommentCreateScreen from '../screens/comment/CommentCreateScreen';
import CommentEditScreen from '../screens/comment/CommentEditScreen';
// Meetup Screens
import MeetupFeedScreen from '../screens/meetup/MeetupFeedScreen';
// Icons
import MeetupIcon from '../../assets/icons/Meetup.svg';
import HomeIcon from '../../assets/icons/Home.svg';
import SearchIcon from '../../assets/icons/Search.svg';
// Constants
import { sizes, colors } from '../constants/constants';

// This navigator organized the two sign up screens
const signUpNavigator = createStackNavigator({
        SignUpOne: SignUpOneScreen,
        SignUpTwo: SignUpTwoScreen
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    },
});

const searchNavigator = createMaterialTopTabNavigator({
        SearchPosts: {
            screen: SearchPostScreen,
            navigationOptions: {
                tabBarLabel: 'Posts'
            },
        },
        SearchUsers: {
            screen: SearchUserScreen,
            navigationOptions: {
                tabBarLabel: 'Users'
            },
        },
    }, {
        tabBarOptions: {
            activeTintColor: colors.primary.MAIN,
            inactiveTintColor: colors.DARK_GRAY,
            upperCaseLabel: false,
            style: {
                backgroundColor: 'transparent',
                marginHorizontal: 25
            },
            labelStyle: {
                fontSize: 18,
                fontFamily: 'Nunito'
            },
            indicatorStyle: {
                backgroundColor: colors.primary.MAIN,
                borderRadius: 1
            }
        },
        tabBarComponent: SearchContainerScreen
});

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

const connectionNavigator = createMaterialTopTabNavigator({
    Followers: {
        screen: FollowersScreen,
        navigationOptions: {
            tabBarLabel: 'Followers'
        },
    },
    Following: {
        screen: FollowingScreen,
        navigationOptions: {
            tabBarLabel: 'Following'
        },
    },
}, {
    tabBarOptions: {
        activeTintColor: colors.primary.MAIN,
        inactiveTintColor: colors.DARK_GRAY,
        upperCaseLabel: false,
        style: {
            backgroundColor: 'transparent',
            marginHorizontal: 25
        },
        labelStyle: {
            fontSize: 18,
            fontFamily: 'Nunito'
        },
        indicatorStyle: {
            backgroundColor: colors.primary.MAIN,
            borderRadius: 1
        }
    },
    tabBarComponent: ConnectionsContainer
});

// This navigator connects the tabFlow to the other screens
const mainNavigator = createStackNavigator({
        tabFlow: tabNavigator,
        // Account Screens
        AccountEdit: AccountEditScreen,
        AccountView: AccountViewScreen,
        // Connections Screen
        Connections: connectionNavigator,
        // Settings Screen
        Settings: SettingsScreen,
        // Post Screens
        PostCreate: PostCreateScreen,
        PostView: PostViewScreen,
        PostEdit: PostEditScreen,
        // Comment Screens
        CommentCreate: CommentCreateScreen,
        CommentEdit: CommentEditScreen,
        // Meetup Screens
        MeetupChat: (() => null),
        MeetupGallery: (() => null),
        MeetupSettings: (() => null),
    },
    {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

// The navigator organizes the authentication screens
const authNavigator = createStackNavigator({
    SignIn: SignInScreen,
    SignUp: {
        screen: signUpNavigator,
        navigationOptions: {
        headerShown: false
        }
    },
    ResetPassword: ResetPasswordScreen
    }, {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    }
});

// This is the root navigator
const appNavigator = createSwitchNavigator({
    // Miscellaneous (external) screens
    ResolveAuth: ResolveAuthScreen,
    NoWifi: NoWifiScreen,
    Welcome: WelcomeScreen,
    // Flows
    authFlow: authNavigator,
    mainFlow: mainNavigator
});

const AppContainer = createAppContainer(appNavigator);
const AppNavigator = () => {
    // Theme
    const theme = Appearance.getColorScheme();

    return (
        <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={{
                backgroundColor: theme === 'dark' ? colors.dark.THIRD : colors.WHITE,
            }}
        >
            <AppContainer
                theme={theme}
                ref={(navigator) => { setNavigator(navigator) }}
            />
        </SafeAreaProvider>
    );
};

export default AppNavigator;


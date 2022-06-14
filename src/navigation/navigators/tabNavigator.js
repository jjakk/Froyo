import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
// Screens
import PostFeedScreen from "../../screens/post/PostFeedScreen";
import MeetupFeedScreen from "../../screens/meetup/MeetupFeedScreen";
// Navigators
import searchNavigator from "./searchNavigator";
// Context
import { useSettings } from "@froyo/settings-context";
// Icons
import MeetupIcon from "../../../assets/icons/Meetup.svg";
import HomeIcon from "../../../assets/icons/Home.svg";
import SearchIcon from "../../../assets/icons/Search.svg";
// Constants
import { sizes } from "@froyo/constants";

const IconRender = ({ Icon, focused, tintColor }) => {
    const { state: { primaryColors } } = useSettings();
    return (
        <Icon
            color={focused ? primaryColors.MAIN : tintColor}
            height={sizes.TAB_ICON}
            width={sizes.TAB_ICON*2}
        />
    );
};

const screens = {
    MeetupFeed: {
        screen: MeetupFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={MeetupIcon}
                    tintColor={tintColor}
                    focused={focused}
                />
            ))
        }
    },
    Search: {
        screen: searchNavigator,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                <IconRender
                    Icon={SearchIcon}
                    tintColor={tintColor}
                    focused={focused}
                />
            ))
        }
    }
};

// This navigator organizes the bottom tab bar
const tabNavigator = (hideFeed) => createBottomTabNavigator(hideFeed ? screens : {
    Feed: {
        screen: PostFeedScreen,
        navigationOptions: {
            tabBarIcon: (({ focused, tintColor }) => (
                    <IconRender
                        Icon={HomeIcon}
                        focused={focused}
                        tintColor={tintColor}
                    />
                ))
        }
    },
    ...screens
}, {
    tabBarOptions: {
        showLabel: false,
        style: {
            height: 60
        }
    },
    initialRouteName: "MeetupFeed"
});

export default tabNavigator;

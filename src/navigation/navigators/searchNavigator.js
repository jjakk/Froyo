import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// Screens
import SearchContainerScreen from "../../screens/search/SearchContainerScreen";
import SearchPostScreen from "../../screens/search/SearchPostScreen";
import SearchUserScreen from "../../screens/search/SearchUserScreen";
// Constants
import { colors } from "../../constants/constants";

const searchNavigator = createMaterialTopTabNavigator({
    SearchPosts: {
        screen: SearchPostScreen,
        navigationOptions: {
            tabBarLabel: "Posts"
        },
    },
    SearchUsers: {
        screen: SearchUserScreen,
        navigationOptions: {
            tabBarLabel: "Users"
        },
    },
}, {
    tabBarOptions: {
        inactiveTintColor: colors.DARK_GRAY,
        upperCaseLabel: false,
        style: {
            backgroundColor: "transparent",
            marginHorizontal: 25
        },
        labelStyle: {
            fontSize: 18,
            fontFamily: "Nunito"
        },
        indicatorStyle: {
            borderRadius: 1
        }
    },
    tabBarComponent: SearchContainerScreen
});

export default searchNavigator;
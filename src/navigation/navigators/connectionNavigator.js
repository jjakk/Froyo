import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// Screens
import FollowersScreen from '../../screens/connection/FollowersScreen';
import FollowingScreen from '../../screens/connection/FollowingScreen';
import ConnectionsContainer from '../../screens/connection/ConnectionsContainer';
import { colors } from '../../constants/constants';

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
            borderRadius: 1
        }
    },
    tabBarComponent: ConnectionsContainer
});

export default connectionNavigator;

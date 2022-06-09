import {
    createStackNavigator,
    TransitionPresets
} from "react-navigation-stack";
// Screens
import ChatMenuScreen from "../../screens/chat/ChatMenuScreen";
import ChatMainScreen from "../../screens/chat/ChatMainScreen";
import ChatCreateScreen from "../../screens/chat/ChatCreateScreen";
import ChatEditScreen from "../../screens/chat/ChatEditScreen";

const chatNavigator = createStackNavigator(
    {
        ChatMenu: ChatMenuScreen,
        ChatMain: ChatMainScreen,
        ChatCreate: ChatCreateScreen,
        ChatEdit: ChatEditScreen
    }, 
    {
        headerMode: "none",
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

export default chatNavigator;

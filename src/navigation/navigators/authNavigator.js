import {
    createStackNavigator,
    TransitionPresets
} from "react-navigation-stack";
// Screens
import SignInScreen from "../../screens/authentication/SignInScreen";
import ResetPasswordScreen from "../../screens/authentication/ResetPasswordScreen";
// Navigators
import signUpNavigator from "./signUpNavigator";

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
        headerMode: "none",
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
    }
});

export default authNavigator;

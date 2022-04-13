import {
    createStackNavigator,
    TransitionPresets
} from 'react-navigation-stack';
// Screens
import SignUpOneScreen from '../../screens/authentication/signUp/SignUpOneScreen';
import SignUpTwoScreen from '../../screens/authentication/signUp/SignUpTwoScreen';

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

export default signUpNavigator;
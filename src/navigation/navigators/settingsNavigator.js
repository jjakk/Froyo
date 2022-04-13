import {
    createStackNavigator,
    TransitionPresets
} from 'react-navigation-stack';
// Screens
import SettingsScreen from '../../screens/settings/SettingsScreen';
import AppearanceSettingsScreen from '../../screens/settings/AppearanceSettingsScreen';
import AccountSettingsScreen from '../../screens/settings/AccountSettingsScreen';
import HelpSettingsScreen from '../../screens/settings/HelpSettingsScreen';

const settingsNavigator = createStackNavigator(
    {
        Settings: SettingsScreen,
        AppearanceSettings: AppearanceSettingsScreen,
        AccountSettings: AccountSettingsScreen,
        HelpSettings: HelpSettingsScreen,
    }, 
    {
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

export default settingsNavigator;

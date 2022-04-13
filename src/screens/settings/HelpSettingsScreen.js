import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import SettingsList from '../../components/settings/SettingsList';

const HelpSettingsScreen = () => {

    const settings = [];
    
    return (
        <ScreenContainer>
            <Header
                title='Help'
            />
            <SettingsList
                settings={settings}
            />
        </ScreenContainer>
    );
};

export default HelpSettingsScreen;
import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { MaterialTopTabBar } from 'react-navigation-tabs'

const ConnectionsContainer = (props) => {
    return (
        <ScreenContainer style={{ flex: 0 }}>
            <Header
                title='Connections'
            />
            <MaterialTopTabBar
                {...props}
            />
        </ScreenContainer>
    );
};

export default ConnectionsContainer;
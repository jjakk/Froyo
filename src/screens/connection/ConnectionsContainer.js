import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { MaterialTopTabBar } from 'react-navigation-tabs'

const ConnectionsContainer = (props) => {
    const {
        navigation
    } = props;

    return (
        <ScreenContainer style={{ flex: 0 }}>
            <Header
                title='Connections'
                navigation={navigation}
            />
            <MaterialTopTabBar
                {...props}
            />
        </ScreenContainer>
    );
};

export default ConnectionsContainer;
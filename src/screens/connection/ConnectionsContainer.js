import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import { MaterialTopTabBar } from "react-navigation-tabs";
// Context
import { useSettings } from "../../context/SettingsContext";

const ConnectionsContainer = (props) => {
    const { state: { primaryColors } } = useSettings();

    return (
        <ScreenContainer style={{ flex: 0 }}>
            <Header
                title="Connections"
            />
            <MaterialTopTabBar
                {...props}
                activeTintColor={primaryColors.MAIN}
                indicatorStyle={{
                    backgroundColor: primaryColors.MAIN
                }}
            />
        </ScreenContainer>
    );
};

export default ConnectionsContainer;
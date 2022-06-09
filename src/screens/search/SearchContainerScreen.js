import React from "react";
import { StyleSheet, Appearance } from "react-native";
// Components
import { MaterialTopTabBar } from "react-navigation-tabs";
import ScreenContainer from "../../components/ScreenContainer";
import SearchBar from "../../components/bars/SearchBar";
// Context
import { useSettings } from "../../context/SettingsContext";
// Constants
import { colors } from "../../constants/constants";

const SearchContainerScreen = (props) => {
    // Context
    const { state: { primaryColors } } = useSettings();

    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        navigation
    } = props;

    const onSearch = (searchQuery) => {
        navigation.navigate("SearchUsers", { searchQuery })
        navigation.navigate("SearchPosts", { searchQuery })
    };

    return (
        <ScreenContainer
            style={[
                styles.container,
                themeStyles[theme].container
            ]}
        >
            <SearchBar
                onSearch={onSearch}
                style={styles.searchBar}
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

const styles = StyleSheet.create({
    container: {
        flex: 0
    },
    searchBar: {
        margin: 25
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default SearchContainerScreen;
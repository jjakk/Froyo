import React from "react";
// Components
import { StyleSheet } from "react-native";
import { FlatList } from "../froyo-elements";
import SettingsItem from "./SettingsItem";

const SettingsList = ({ settings }) => {

    return (
        <FlatList
            data={settings}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item }) => (
                <SettingsItem item={item} />
            )}
            style={styles.options}
        />
    );
};

const styles = StyleSheet.create({
    options: {
        flex: 1,
    },
});

export default SettingsList;
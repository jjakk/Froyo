import React, {
    useEffect,
    useState
} from "react";
// Components
import {
    Appearance,
    View,
    StyleSheet
} from "react-native";
import {
    Input,
    TouchableIcon
} from "../froyo-elements";
// Icons
import SearchIcon from "../../../assets/icons/Search.svg";
import CloseIcon from "../../../assets/icons/Close.svg"
// Constants
import { colors, sizes } from "../../constants/constants";

const SearchBar = (props) => {
    const theme = Appearance.getColorScheme();
    const [text, setText] = useState("");
    const {
        onSearch,
    } = props;

    const clearText = async () => {
        setText("");
        onSearch("");
    };

    const onSubmit = () => {
        onSearch(text);
    }

    return (
        <View>
            <View style={[
                styles.container,
                themeStyles[theme].container
            ]}>
                <Input
                    style={styles.text}
                    onChangeText={setText}
                    value={text}
                    placeholder="Search"
                    icon={(
                        <SearchIcon
                            color={colors[theme === "dark" ? "GRAY" : "LIGHT_BLACK"]}
                            width={sizes.ACTION_ICON_SMALL}
                            height={sizes.ACTION_ICON_SMALL}
                        />
                    )}
                    onSubmitEditing={onSubmit}
                />
                {
                    text !== "" ? (
                        <TouchableIcon
                            Icon={CloseIcon}
                            size={20}
                            color={colors[theme === "dark" ? "GRAY" : "LIGHT_BLACK"]}
                            style={styles.clear}
                            onPress={clearText}
                        />
                    ) : null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0,
        borderRadius: 50,
        margin: 25
    },
    text: {
        flex: 1,
        backgroundColor: "transparent"
    },
    clear: {
        marginRight: 20,
        opacity: 0.5
    }
});

const themeStyles = {
    light: StyleSheet.create({
        container: {
            backgroundColor: colors.WHITE
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: colors.dark.FIRST
        }
    })
};

export default SearchBar;


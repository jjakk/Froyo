import React, { forwardRef } from "react";
// Components
import {
    Appearance,
    StyleSheet,
    FlatList as DefaultFlatList
} from "react-native";
import { LoadingAnimation } from "@froyo/animations";
import EmptySign from "./EmptySign";
// Constants
import { colors } from "@froyo/constants";

const FlatList = (props, ref) => {
    const theme = Appearance.getColorScheme();
    const {
        style,
        emptyMessage,
        loading,
        keyExtractor=(
            (item) => item.id
        ),
        RenderComponent,
        ...restOfProps
    } = props;

    return (
        <DefaultFlatList
            style={[
                themeStyles[theme].list,
                style
            ]}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
                <RenderComponent
                    data={item}
                />
            )}
            ListEmptyComponent={() => (
                loading ? (
                    <LoadingAnimation
                        style={styles.emptyComponent}
                    />
                ) : (
                    <EmptySign
                        style={styles.emptyComponent}
                        text={emptyMessage}
                    />
                )
            )}
            ref={ref}
            {...restOfProps}
        />
    );
};

const styles = StyleSheet.create({
    emptyComponent: {
        alignSelf: "center",
        marginTop: 35,
        marginBottom: 35
    }
});

const themeStyles = {
    light: StyleSheet.create({
        list: {
            backgroundColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        list: {
            backgroundColor: colors.dark.FOURTH
        }
    })
};

export default forwardRef(FlatList);
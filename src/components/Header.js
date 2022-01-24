import React from 'react';
// Components
import { StyleSheet, View } from 'react-native';
import { Text, TouchableIcon } from './froyo-elements';
// Context
import { useSettings } from '../context/SettingsContext';
// Icons
import BackIcon from '../../assets/icons/Back.svg';
// Constants
import { colors, sizes } from '../constants/constants';

const Header = (props) => {
    const { state: { darkModeEnabled } } = useSettings();
    const theme = darkModeEnabled ? 'dark' : 'light';
    const {
        navigation,
        style,
        size,
        RightIcon,
        RightIconProps,
        LeftIcon,
        LeftIconProps,
        title
    } = props;

    const onBack = () => {
        navigation.pop();
    };

    const BlankIcon = (
        <View
            style={{
                width: size,
                height: size
            }}
        />
    );

    return (
        <View style={[
            styles.header,
            themeStyles[theme].header,
            style
        ]}>
            {
                <TouchableIcon
                    Icon={LeftIcon || BackIcon}
                    onPress={onBack}
                    size={size}
                    color={darkModeEnabled ? colors.WHITE : colors.BLACK}
                    {...LeftIconProps}
                />
            }
            {
                title ? (
                    <Text
                        style={[
                            styles.title,
                            themeStyles[theme].title
                        ]}
                    >
                        {title}
                    </Text>
                ) : null
            }
            {
                RightIcon ? (
                    <TouchableIcon
                        Icon={RightIcon}
                        size={size}
                        color={darkModeEnabled ? colors.WHITE : colors.BLACK}
                        {...RightIconProps}
                    />
                ) : BlankIcon
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 2,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        alignSelf: 'center',
    }
});

const themeStyles = {
    light: StyleSheet.create({
        header: {
            borderBottomColor: colors.LIGHT_GREY,
            backgroundColor: colors.WHITE
        }
    }),
    dark: StyleSheet.create({
        header: {
            borderBottomColor: colors.dark.SECOND,
            backgroundColor: colors.dark.THIRD,
        },
        title: {
            color: colors.WHITE,
        }
    })
};

Header.defaultProps = {
    size: sizes.HEADER_ICON_SIZE
};

export default Header;
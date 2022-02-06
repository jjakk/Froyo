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
    // Context
    const { state: { theme } } = useSettings();

    // Props
    const {
        navigation,
        style,
        size,
        RightIcon,
        RightIconProps,
        MiddleIcon,
        MiddleIconProps,
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
            <TouchableIcon
                Icon={LeftIcon || BackIcon}
                onPress={onBack}
                size={size}
                {...LeftIconProps}
            />
            {
                MiddleIcon ? (
                    <TouchableIcon
                        Icon={MiddleIcon}
                        size={size}
                        {...MiddleIconProps}
                    />
                ) : (
                    title && (
                        <Text
                            style={styles.title}
                        >
                            {title}
                        </Text>
                    )
                )
            }
            {
                RightIcon ? (
                    <TouchableIcon
                        Icon={RightIcon}
                        size={size}
                        {...RightIconProps}
                    />
                ) : BlankIcon
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
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
            backgroundColor: colors.WHITE
        }
    }),
    dark: StyleSheet.create({
        header: {
            backgroundColor: colors.dark.THIRD,
        }
    })
};

Header.defaultProps = {
    size: sizes.HEADER_ICON_SIZE
};

export default Header;
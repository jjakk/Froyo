import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Text,
    TouchableIcon
} from './froyo-elements';
// Navigation
import { navigateBack } from '../navigation/navigationRef';
// Icons
import BackIcon from '../../assets/icons/Back.svg';
// Constants
import { colors, sizes } from '../constants/constants';

const Header = (props) => {
    const theme = Appearance.getColorScheme();

    // Props
    const {
        style,
        size,
        RightIcon,
        RightIconProps,
        MiddleIcon,
        MiddleIconProps,
        hideLeftIcon=false,
        LeftIcon=BackIcon,
        LeftIconImageOverride,
        LeftIconProps,
        title
    } = props;

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
                hideLeftIcon ? BlankIcon : (
                    LeftIconImageOverride ? (
                        <TouchableOpacity
                            onPress={navigateBack}
                            {...LeftIconProps}
                        >
                            <Image
                                source={LeftIconImageOverride}
                                style={{
                                    width: size,
                                    height: size,
                                    borderRadius: size
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableIcon
                            Icon={LeftIcon}
                            size={size}
                            onPress={navigateBack}
                            {...LeftIconProps}
                        />
                    )
                )
            }
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
        borderBottomWidth: 1,
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
            backgroundColor: colors.WHITE,
            borderBottomColor: colors.light.FIRST
        }
    }),
    dark: StyleSheet.create({
        header: {
            backgroundColor: colors.dark.THIRD,
            borderBottomColor: colors.dark.FIRST
        }
    })
};

Header.defaultProps = {
    size: sizes.HEADER_ICON_SIZE
};

export default Header;
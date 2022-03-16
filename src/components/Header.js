import React from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View
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
        title,
        iconSize=sizes.HEADER_ICON_SIZE,
        hideLeftIcon=false,
        // Component props
        RightIcon,
        RightIconProps,
        MiddleIcon,
        MiddleIconProps,
        LeftIcon=BackIcon,
        LeftIconProps
    } = props;

    const IconFiller = (
        <View
            style={{
                width: iconSize,
                height: iconSize
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
                hideLeftIcon ? IconFiller : (
                    <TouchableIcon
                        Icon={LeftIcon}
                        onPress={navigateBack}
                        size={iconSize}
                        {...LeftIconProps}
                    />
                )
            }
            {
                MiddleIcon ? (
                    <TouchableIcon
                        Icon={MiddleIcon}
                        size={iconSize}
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
                        size={iconSize}
                        {...RightIconProps}
                    />
                ) : IconFiller
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
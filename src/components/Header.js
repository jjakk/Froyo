import React from 'react';
// Components
import { StyleSheet, View } from 'react-native';
import { Text, TouchableIcon } from './froyo-elements';
// Icons
import BackIcon from '../../assets/icons/Back.svg';
// Constants
import { sizes } from '../constants/constants';

const Header = (props) => {
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
        <View style={[styles.header, style]}>
            {
                <TouchableIcon
                    Icon={LeftIcon || BackIcon}
                    onPress={onBack}
                    size={size}
                    {...LeftIconProps}
                />
            }
            {
                title ? (
                    <Text
                        style={styles.title}
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
                        {...RightIconProps}
                    />
                ) : BlankIcon
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomColor: '#F2F2F2',
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

Header.defaultProps = {
    size: sizes.HEADER_ICON_SIZE
};

export default Header;
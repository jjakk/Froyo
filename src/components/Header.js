import React from 'react';
// Components
import { StyleSheet, View } from 'react-native';
import { TouchableIcon } from './froyo-elements';
import BackIcon from '../../assets/icons/Back.svg';

const Header = (props) => {
    const {
        navigation,
        style,
        RightIcon,
        rightIconOnPress,
        rightIconColor,
        rightIconSize,
        leftIconSize
    } = props;

    const onBack = () => {
        navigation.pop();
    };

    return (
        <View style={[styles.header, style]}>
            <TouchableIcon
                Icon={BackIcon}
                size={leftIconSize}
                onPress={onBack}
            />
            {
                RightIcon ? (
                    <TouchableIcon
                        Icon={RightIcon}
                        size={rightIconSize}
                        onPress={rightIconOnPress}
                        color={rightIconColor}
                    />
                ) : null
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
        justifyContent: 'space-between'
    },
});

Header.defaultProps = {
    rightIconSize: 25,
    leftIconSize: 25
};

export default Header;
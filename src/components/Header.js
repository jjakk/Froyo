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
        RightIconProps,
        LeftIcon,
        LeftIconProps
    } = props;

    const onBack = () => {
        navigation.pop();
    };

    return (
        <View style={[styles.header, style]}>
            {
                <TouchableIcon
                    Icon={LeftIcon || BackIcon}
                    size={20}
                    onPress={onBack}
                    {...LeftIconProps}
                />
            }
            {
                RightIcon ? (
                    <TouchableIcon
                        Icon={RightIcon}
                        size={20}
                        {...RightIconProps}
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
};

export default Header;
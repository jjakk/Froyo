import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../constants/constants';

const LikenessBar = (props) => {
    const {
        show,
        like_count,
        dislike_count,
        style
    } = props;
    
    const styles = StyleSheet.create({
        bar: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            height: 5,
            backgroundColor: colors.GREY,
            flexDirection: 'row',
        },
        like: {
            backgroundColor: colors.FROYO_GREEN,
            flex: like_count,
        },
        dislike: {
            backgroundColor: colors.DISLIKE_RED,
            flex: dislike_count,
        }
    });

    return show ? (
        <View style={[styles.bar, style]}>
            <View style={styles.like} />
            <View style={styles.dislike} />
        </View>
    ): null;
};

export default LikenessBar;
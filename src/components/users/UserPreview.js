import React from 'react';
import {
    StyleSheet,
    Appearance,
    View
} from 'react-native';

const UserPreview = (props) => {
    // Theme
    const theme = Appearance.getColorScheme();

    const {
        user: {
            first_name,
            last_name,
            profile_picture_bucket_key,
        }
    } = props;

    return (
        <View>

        </View>
    );
};

const styles = StyleSheet.create({

});

export default UserPreview;
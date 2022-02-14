import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { BASE_URL } from '../../constants/constants';

const ImageList = (props) => {
    const {
        style,
        data: keys
    } = props;

    return keys.length === 1
    ? (
        (
            <Image
                source={{
                    uri: `${BASE_URL}/images/${keys[0]}`
                }}
                style={[styles.container, styles.image, style]}
            />
        )
    ) : (
        <View style={[styles.container, style]}>
            <ScrollView
                snapToInterval={Dimensions.get('window').width}
                decelerationRate="fast"
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    keys.map((key, index) => (
                        <TouchableWithoutFeedback
                            key={index}
                        >
                            <Image
                                source={{
                                    uri: `${BASE_URL}/images/${key}`
                                }}
                                style={styles.image}
                            />
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        resizeMode: 'cover'
    }
});

export default ImageList;
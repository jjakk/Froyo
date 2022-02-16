import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { BASE_URL, colors } from '../../constants/constants';

const ImageList = (props) => {
    const {
        style,
        data: keys
    } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showIndicator, setShowIndicator] = useState(true);

    const onScroll = (event) => {
        const offset = event.nativeEvent.contentOffset.x/Dimensions.get('window').width;
        const index = Math.round(offset);
        if(currentIndex !== index) {
            setCurrentIndex(index);
        }
    };

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
                decelerationRate='fast'
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={64}
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
            <View style={[
                styles.indexIndicator,
                {
                    opacity: showIndicator ? 1 : 0
                }
            ]}>
            {
                keys.map((key, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === currentIndex && styles.activeDot
                        ]}
                    />
                ))
            }
            </View>
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
    },
    indexIndicator: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        bottom: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 2,
        borderWidth: 1,
        borderColor: colors.WHITE
    },
    activeDot: {
        backgroundColor: colors.WHITE
    }
});

export default ImageList;
import React, { useState } from 'react';
// Components
import {
    Appearance,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
// Context
import { useSettings } from '../../context/SettingsContext';
// Constants
import { BASE_URL, colors } from '../../constants/constants';

const ImageList = (props) => {
    // Context
    const { state: { primaryColors } } = useSettings();

    // Theme
    const theme = Appearance.getColorScheme();

    // Props
    const {
        style,
        data: keys
    } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

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
            <View style={ styles.indexIndicator}>
            {
                keys.map((key, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            themeStyles[theme].dot,
                            index === currentIndex && {
                                backgroundColor: primaryColors.MAIN
                            }
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15
    },
    dot: {
        width: 7.5,
        height: 7.5,
        borderRadius: 5,
        margin: 2
    }
});

const themeStyles = {
    light: StyleSheet.create({
        dot: {
            backgroundColor: colors.GRAY
        }
    }),
    dark: StyleSheet.create({
        dot: {
            backgroundColor: colors.DARK_GRAY
        }
    })
};

export default ImageList;
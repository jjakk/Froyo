import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// Components
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity
} from 'react-native';
import TouchableIcon from './TouchableIcon';
// Icons
import CloseIcon from '../../../assets/icons/Close.svg';
// Constants
import { colors } from '../../constants/constants';
  
const ImageUpload = (props) => {
    // Props
    const {
        onUpload,
        style,
        PlaceholderComponent
    } = props;

    // State
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            onUpload(result.uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={[styles.container, style]}>
                {
                    image ? (
                        <ImageBackground
                            source={{ uri: image }}
                            style={styles.image}
                        >
                            <View>
                                <TouchableIcon
                                    Icon={CloseIcon}
                                    size={20}
                                    onPress={() => setImage(null)}
                                    color={colors.WHITE}
                                    style={styles.close}
                                />
                            </View>
                        </ImageBackground>
                    ) : PlaceholderComponent
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    image: {
        flex: 1
    },
    close: {
        alignSelf: 'flex-end',
        marginTop: 25,
        marginRight: 25,
        opacity: 0.75
    }
});

export default ImageUpload;


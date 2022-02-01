import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// Components
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity
} from 'react-native';
// Icons
import CloseIcon from '../../../assets/icons/Close.svg';
// Constants
import { colors } from '../../constants/constants';
  
const ImageUpload = (props) => {
    // Props
    const {
        onUpload,
        style,
        uploadedStyle,
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
            <View style={[
                styles.container,
                style,
                image ? uploadedStyle : null
            ]}>
                {
                    image ? (
                        <ImageBackground
                            source={{ uri: image }}
                            style={styles.image}
                        >
                            <TouchableOpacity onPress={() => setImage(null)}>
                                <View style={styles.close}>
                                    <CloseIcon
                                        width={20}
                                        height={20}
                                        color={colors.WHITE}
                                    />
                                </View>
                            </TouchableOpacity>
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
        marginTop: 15,
        marginRight: 15,
        opacity: 0.5,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 25,
    }
});

export default ImageUpload;


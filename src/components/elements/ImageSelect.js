import React from 'react';
import * as ImagePicker from 'expo-image-picker';
// Components
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity
} from 'react-native';
// Context
import { useSettings } from '../../context/SettingsContext';
// Icons
import CloseIcon from '../../../assets/icons/Close.svg';
// Constants
import { colors } from '../../constants/constants';
  
const ImageUpload = (props) => {
    // Context
    const { state: { theme } } = useSettings();

    // Props
    const {
        image,
        setImage,
        onDelete,
        style,
        uploadedStyle,
        aspectRatio,
        PlaceholderComponent
    } = props;

    const pickImage = async () => {
        let imageConfig = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.5,
        };
        if (aspectRatio) {
            imageConfig = {
                ...imageConfig,
                allowsEditing: true,
                aspect: aspectRatio,
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync(imageConfig);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={[
                styles.container,
                themeStyles[theme].imageUpload,
                style,
                image ? uploadedStyle : null
            ]}>
                {
                    image ? (
                        <ImageBackground
                            source={{ uri: image }}
                            style={styles.image}
                        >
                            <TouchableOpacity onPress={() => {
                                setImage(null);
                                onDelete();
                            }}>
                                <View style={styles.close}>
                                    <CloseIcon
                                        width={15}
                                        height={15}
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
        backgroundColor: colors.LIGHT_BLACK,
        padding: 10,
        borderRadius: 25,
    }
});

const themeStyles = {
    light: StyleSheet.create({
        imageUpload: {
            backgroundColor: colors.light.FIRST,
            borderColor: colors.light.SECOND
        }
    }),
    dark: StyleSheet.create({
        imageUpload: {
            backgroundColor: colors.dark.SECOND,
            borderColor: colors.dark.FIRST
        }
    })
};

export default ImageUpload;


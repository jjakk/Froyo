import { Alert } from 'react-native';


const confirmAlert = (message, callback) => {
    Alert.alert(
        message,
        '',
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "OK",
                onPress: callback
            }
        ]
    );
};

export default confirmAlert;
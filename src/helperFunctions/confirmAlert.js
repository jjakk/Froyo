import { Alert } from 'react-native';


const confirmAlert = (message, callback) => {
    Alert.alert(
        message,
        null,
        [
            {
                text: "No",
                style: "cancel"
            },
            {
                text: "Yes",
                style: "destructive",
                onPress: callback
            }
        ],
        {
            cancelable: true
        }
    );
};

export default confirmAlert;
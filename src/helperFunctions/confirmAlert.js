import { Alert } from 'react-native';


const confirmAlert = (message, callback) => {
    Alert.alert(
        message.title,
        message.subtitle,
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
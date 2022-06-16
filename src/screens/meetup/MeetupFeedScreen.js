import React from "react";
import { Alert } from "react-native";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { MeetupList } from "@froyo/lists";
// Context
import { useSettings } from "@froyo/settings-context";
import { useUser } from "@froyo/user-context";
// Icons
import { PlusIcon, guestProfilePicture } from "@froyo/icons";
// Constants
import { API_ENDPOINT } from "@froyo/constants";

const MeetupFeedScreen = ({ navigation }) => {
    // Context
    const { state: { hideFeed, flavor } } = useSettings();
    const { state: { user } } = useUser();

    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? {
            uri: `${API_ENDPOINT}/images/${user.profile_picture_bucket_key}`
        }
        : guestProfilePicture(flavor)
    );

    // Event handlers
    const onAccountView = () => {
        navigation.navigate("AccountView");
    };

    const onCreateMeetup = () => {
        //navigation.navigate("MeetupCreate");
        Alert.alert(
            "This feature has not been implemented yet.",
            null,
            [
                {
                    text: "Ok",
                    style: "cancel"
                }
            ],
            {
                cancelable: true
            }
        );
    };

    return (
        <ScreenContainer>
            <Header
                title="Meetups"
                hideLeftIcon={!hideFeed}
                LeftIconImage={profilePictureSource}
                LeftIconProps={{
                    onPress: onAccountView
                }}
                RightIcon={PlusIcon}
                RightIconProps={{
                    onPress: onCreateMeetup
                }}
            />
            <MeetupList
                data={[]}
                emptyMessage="No one in your network's hosting a meetup at the moment"
            />
        </ScreenContainer>
    );
};

export default MeetupFeedScreen;
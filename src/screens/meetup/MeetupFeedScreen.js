import React from "react";
import { Alert } from "react-native";
// Components
import { ScreenContainer, Header } from "@froyo/fundamentals";
import { MeetupList } from "@froyo/lists";
// Context
import { useSettings } from "@froyo/settings-context";
import { useUser } from "@froyo/user-context";
// Icons
import {
    PlusIcon,
    guestProfilePicture,
    awsBucketImage
} from "@froyo/icons";

const MeetupFeedScreen = ({ navigation }) => {
    // Context
    const { state: { hideFeed, flavor } } = useSettings();
    const { state: { user } } = useUser();

    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? awsBucketImage(user.profile_picture_bucket_key)
        : guestProfilePicture(flavor)
    );

    // Event handlers
    const onAccountView = () => {
        navigation.navigate("AccountView");
    };

    const onCreateMeetup = () => {
        //navigation.navigate("MeetupCreate");
        Alert.alert(
            "Coming soon",
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

    const DUMMY_MEETUPS = [
        {
            id: 1,
            title: "Bowlin' with the bois",
            members: Array(4),
            author: user,
            joined: true
        },
        {
            id: 2,
            title: "Movie night @ 8 🍿",
            description: "It's morbin' time. Be there or be square",
            location: "Race Lawn",
            members: Array(8),
            author: {
                id: 2,
                first_name: "John",
                last_name: "Doe",
            }
        },
    ];

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
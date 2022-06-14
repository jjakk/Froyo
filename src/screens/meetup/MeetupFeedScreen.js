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
import { BASE_URL } from "@froyo/constants";

const MeetupFeedScreen = ({ navigation }) => {
    // Context
    const { state: { hideFeed } } = useSettings();
    const { state: { user } } = useUser();

    const dummyMeetups = [
        {
            id: "1",
            title: "Amphibian Society Gala",
            joined: true,
            description: "Join us for the classiest evening at Rural Drinkery and witness the grand opening of the all new Urban Eatery food truck.",
            date: new Date(Date.now()),
            time: "7:30 PM",
            location: "3400 Lancaster Av.",
            author: {
                first_name: "John",
                last_name: "Doe",
            }
        },
        {
            id: "2",
            title: "Some Other Event",
            joined: false,
            description: null,
            date: new Date(Date.now()+999999999),
            time: "12:00 PM",
            location: "123 something st.",
            author: {
                first_name: "Bob",
                last_name: "Smith",
            }
        }
    ];

    // Conditional rendering
    const profilePictureSource = (
        user.profile_picture_bucket_key
        ? {
            uri: `${BASE_URL}/images/${user.profile_picture_bucket_key}`
        }
        : guestProfilePicture
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
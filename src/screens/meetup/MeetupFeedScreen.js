import React from 'react';
import { Alert } from 'react-native';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import MeetupList from '../../components/meetups/MeetupList';
// Icons
import Plus from '../../../assets/icons/Plus.svg';

const MeetupFeedScreen = () => {
    const onCreateMeetup = () => {
        Alert.alert(
            'This feature has not been implemented yet.',
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

    const dummyMeetups = [
        {
            id: '1',
            title: 'Amphibian Society Gala',
            joined: true,
            description: 'Join us for the classiest evening at Rural Drinkery and witness the grand opening of the all new Urban Eatery food truck.',
            date: new Date(Date.now()),
            time: '7:30 PM',
            location: '3400 Lancaster Av.',
            author: {
                first_name: 'John',
                last_name: 'Doe',
            }
        },
        {
            id: '2',
            title: 'Some Other Event',
            joined: false,
            description: null,
            date: new Date(Date.now()+999999999),
            time: '12:00 PM',
            location: '123 something st.',
            author: {
                first_name: 'Bob',
                last_name: 'Smith',
            }
        }
    ];

    return (
        <ScreenContainer>
            <Header
                title='Meetups'
                hideLeftIcon
                RightIcon={Plus}
                RightIconProps={{
                    onPress: onCreateMeetup
                }}
            />
            <MeetupList
                data={dummyMeetups}
                emptyMessage="No one in your network's hosting a meetup at the moment"
            />
        </ScreenContainer>
    );
};

export default MeetupFeedScreen;
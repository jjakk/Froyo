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
                emptyMessage="No one in your network's hosting an event at the moment"
            />
        </ScreenContainer>
    );
};

export default MeetupFeedScreen;
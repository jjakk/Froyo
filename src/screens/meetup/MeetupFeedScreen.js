import React from 'react';
// Components
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import MeetupList from '../../components/meetups/MeetupList';
// Icons
import Plus from '../../../assets/icons/Plus.svg';

const MeetupFeedScreen = () => {
    return (
        <ScreenContainer>
            <Header
                title='Meetups'
                hideLeftIcon
                RightIcon={Plus}
            />
            <MeetupList
                emptyMessage="No one in your network's hosting an event at the moment"
            />
        </ScreenContainer>
    );
};

export default MeetupFeedScreen;
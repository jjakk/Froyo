import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Platform, StyleSheet } from 'react-native';
import Button from './Button';

const DatePicker = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(Platform.OS === 'ios');
    const [dateFocused, setDateFocused] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showTimePicker = () => {
        showMode('time');
    };

    const parseDate = (date) => {
        const day = date.getDate();
        const month = 1 + date.getMonth();
        const year = 1900 + date.getYear();
        return `${month}/${day}/${year}`;
    }


    return (
        <View>
            <View>
                <Button
                    onPress={() => {
                        if(!dateFocused){
                            setDateFocused(true);
                        }
                        showDatePicker()
                    }}
                    title={(dateFocused ? (parseDate(date)) : 'Date of birth')}
                    color='black'
                    textColor={( dateFocused ? 'black' : 'rgba(0,0,0,0.3)')}
                    type='secondary'
                    textAlign='left'
                    titleStyle={styles.buttonText}
                    {...props}
                />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        margin: 5
    }
});

export default DatePicker;
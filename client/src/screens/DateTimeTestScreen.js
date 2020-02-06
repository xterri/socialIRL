import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const DateTimeTestScreen = () => {

    // datetime picker set up
    const [pickerMode, setPickerMode] = useState(null);

    const showDatePicker = () => {
        setPickerMode("date");
    };

    const showTimePicker = () => {
        setPickerMode("time");
    }

    const hidePicker = () => {
        setPickerMode(null);
    };

    const handleConfirm = (date) => {
        console.log('Date chose: ', date);
        hidePicker();
    };

    return (
        <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <Button title="Show Time Picker" onPress={showTimePicker} />
            <DateTimePickerModal
                isVisible={pickerMode !== null} // show/hide datetime picker
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                mode={pickerMode}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default DateTimeTestScreen;
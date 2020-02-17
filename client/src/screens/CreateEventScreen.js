import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker'; //'@react-native-community/datetimepicker';

import { Context as EventContext } from '../context/EventContext';

const CreateEventScreen = ({ navigation }) => {
    const { addEvent } = useContext(EventContext);

    const todayDate = new Date();

    const [title, setTitle] = useState('');
    const [description, setContent] = useState('');
    const [date, setDate] = useState(new Date());

    // datetime picker set up
    const [pickerMode, setPickerMode] = useState(null);

    const showDateTimePicker = () => { setPickerMode("datetime"); }
    const hidePicker = () => { setPickerMode(null); };
    
    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        hidePicker();
    };

    const displayDate = (date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + '\t'+ date.getHours() +  ':' + date.getMinutes();
    }

    return (
        <View>
            <Text style={{ fontSize: 40 }}>CREATE EVENTS</Text>
            
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    value={title}
                    onChangeText={(newTitle) => setTitle(newTitle)}
                    style={styles.input}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput 
                    value={description}
                    onChangeText={(newDescription) => setContent(newDescription)}
                    style={styles.input}
                />
                <Text style={styles.label}>Event Date</Text>
                <TouchableOpacity onPress={showDateTimePicker}>
                    <TextInput 
                        value={displayDate(date)}
                        style={styles.input}
                        editable={false}
                    />
                    <DateTimePicker
                        isVisible={pickerMode !== null} // show/hide datetime picker
                        onConfirm={handleConfirm}
                        onCancel={hidePicker}
                        mode={pickerMode}
                        date={date}
                        minimumDate={todayDate}
                        minuteInterval={10}
                    />
                </TouchableOpacity>
                <Button 
                    title='Create Event' 
                    onPress={() => addEvent(title, description, date, () => {navigation.navigate('ListMain')})}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        backgroundColor: '#eee',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },
    label: {
        fontSize: 20, 
        marginBottom: 5,
        marginLeft: 5,
    }
});

export default CreateEventScreen;
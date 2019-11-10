import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { Context as EventContext } from '../context/EventContext';

const CreateEventScreen = ({ navigation }) => {
    const { addEvent } = useContext(EventContext);

    const [title, setTitle] = useState('');
    const [description, setContent] = useState('');
    const [eventDate, setDate] = useState('');

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
                <TextInput 
                    value={eventDate}
                    onChangeText={(newDate) => setDate(newDate)}
                    style={styles.input}
                />
                <Button 
                    title='Create Event' 
                    onPress={() => addEvent(title, description, eventDate, () => {navigation.navigate('AccountMain')})}
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
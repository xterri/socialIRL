import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const AccountMainScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>ACCOUNT MAIN</Text>

            {/* May want to change the navigation here to Stack, and mainFlow to accountFlow to SwitchNavigator*/}
            <Button title='Edit Profile' onPress={() => navigation.navigate('EditAccount')} />
            <Button title='Account Settings' onPress={() => navigation.navigate('Settings')} />
            <Button title='Create Event' onPress={() => navigation.navigate('CreateEvent')} />

            <TouchableOpacity style={styles.eventButtons} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Test Event 1 Button</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.eventButtons} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Test Event 2 Button</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.eventButtons} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Test Event 3 Button</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    eventButtons: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        height: 100,
        width: 100
    },
});

export default AccountMainScreen;
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import EventCards from '../components/EventCards';

const MainScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>MAIN SCREEN</Text>

            <TouchableOpacity onPress={() => alert('Swipe to change event cards')}>
                <EventCards 
                    toEvent={() => navigation.navigate('EventDetails')}
                    toProfile={() => navigation.navigate('UserProfile')}
                    onLeftSwipe={() => alert('liked')}
                    onRightSwipe={() => alert('rejected')}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.yesButton} onPress={() => alert('Interested, change card')}>
                <Text>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.noButton} onPress={() => alert('Not interested, change card')}>
                <Text>No</Text>
            </TouchableOpacity>

            {/* TODO: add notification and button to begin event and confirm attendance */}
            <Button title='START EVENT?' onPress={() => navigation.navigate('ConfirmAttendance')} />
        </View>
    );
};

MainScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: (
            <Button
                onPress={() => alert('Switch to Host/User View!')}
                title='Switch'
            />
        ),
        headerLeft: (
            <Button
                onPress={() => navigation.navigate('AccountMain')}
                title='Account'
            />
        ),
        headerRight: (
            <Button
                onPress={() => navigation.navigate('ChatList')}
                title='Chats'
            />
        )
    };
};

const styles = StyleSheet.create({
    noButton: {
        marginLeft: 200,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 50,
        height: 100,
        width: 100
    },
    yesButton: {
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 50,
        height: 100,
        width: 100
    }
});

export default MainScreen;
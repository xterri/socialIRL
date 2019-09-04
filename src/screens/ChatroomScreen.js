import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ChatroomScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>CHATROOMS</Text>

            <TouchableOpacity style={styles.info} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Event Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('UserProfile')}>
                <Text>User 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('UserProfile')}>
                <Text>User 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('UserProfile')}>
                <Text>User 3</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 20 }}>Display Conversation Here</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        height: 20,
        width: 20,
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 10,
    },
    userButton: {
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 25,
        height: 50,
        width: 50
    }
});

export default ChatroomScreen;
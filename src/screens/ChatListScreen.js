import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ChatListScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>CHAT LIST</Text>

            {/* TODO: add render to display list of chatrooms tied to a user in db */}
            <TouchableOpacity style={styles.chatBox} onPress={() => navigation.navigate('Chatroom')}>
                <Text>Chatroom 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatBox} onPress={() => navigation.navigate('Chatroom')}>
                <Text>Chatroom 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatBox} onPress={() => navigation.navigate('Chatroom')}>
                <Text>Chatroom 3</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    chatBox: {
        height: 100,
        width: 300, 
        borderColor: '#000',
        borderWidth: 1
    }
});

export default ChatListScreen;
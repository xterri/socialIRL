import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 40 }}>VIEW OTHER USERS PROFILES</Text>

            <TouchableOpacity style={styles.eventButtons} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Past Event 1 Button</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.eventButtons} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Past Event 2 Button</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.eventButtons} onPress={() => navigation.navigate('EventDetails')}>
                <Text>Past Event 3 Button</Text>
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

export default UserProfileScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventCards = ({ toEvent, toProfile }) => {
    return (
        <View style={styles.card}>
            <Text>Event Details/Information</Text>

            <TouchableOpacity style={styles.info} onPress={toEvent}>
                <Text>Info</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toProfile}>
                <Text style={{ color: 'blue' }}>Username</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 400,
        width: 350,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
    },
    info: {
        height: 50,
        width: 50,
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 25,
    }
});

export default EventCards;